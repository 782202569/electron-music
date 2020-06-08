import React from "react";
import { Menu, Button, Table, Space } from "antd";
import mpv from "../../static/qingkuai.mp3";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./index.less";
/*import io from 'socket.io-client'*/
const { SubMenu } = Menu;
// const path = require("path");
let musicAudio = new Audio();
let allTracks;
let currentTrack;
const { ipcRenderer } = window.require("electron");
/*const socket = io('ws://127.0.0.1:7000')*/
const columns = (props) => {
  const { playAudio } = props;
  return [
    {
      title: "文件名",
      dataIndex: "fileName",
      key: "fileName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "路径",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "操作",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => playAudio(record.id)}>播放</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];
};

class AntZone extends React.Component {
  name_with_namespace;
  constructor(props, context) {
    super(props, context);
    this.state = {
      current: "mail",
      data: [],
      src: "",
    };
  }
  componentDidMount() {
    console.log("主页面第一次");
    ipcRenderer.on("getTracks", (event, tracks) => {
      console.log("主页面", tracks);
      this.setState({
        data: tracks,
      });
      allTracks = tracks;
    });
  }
  handleClick = (e) => {
    console.log("click ", e);
    this.setState({
      current: e.key,
    });
  };
  sendClick = (e) => {
    console.log("click ", e);
    ipcRenderer.send("add-music-window");
  };
  playAudio = (e) => {
    console.log(e);
    console.log(mpv);
    currentTrack = allTracks.find((track) => track.id === e);
    // musicAudio.src = currentTrack.path;
    // musicAudio.play();
    // musicAudio.src = "../../static/qingkuai.mp3";
    // musicAudio.load();
    const audio = document.getElementById(`audio`);
    // audio.src = `${mpv.substring(0, mpv.lastIndexOf("/"))}/${
    //   currentTrack.fileName
    // }`;
    audio.play();
  };
  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="mail" icon={<MailOutlined />}>
            Navigation One
          </Menu.Item>
          <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
            Navigation Two
          </Menu.Item>
          <SubMenu
            icon={<SettingOutlined />}
            title="Navigation Three - Submenu"
          >
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="alipay">
            <a
              href="https://ant.design"
              target="_blank"
              rel="noopener noreferrer"
            >
              Navigation Four - Link
            </a>
          </Menu.Item>
        </Menu>
        <header style={{ textAlign: "center", margin: "20px" }}>
          <h2>个人音乐播放器</h2>
        </header>
        <Button
          type="primary"
          style={{ marginLeft: "20px" }}
          onClick={this.sendClick.bind(this)}
        >
          添加歌曲到曲库
        </Button>
        <div>
          <Table
            columns={columns({ playAudio: this.playAudio })}
            dataSource={this.state.data}
          />
        </div>
        <audio id="audio" controls="controls" src={mpv}></audio>
      </div>
    );
  }
}

export default AntZone;
