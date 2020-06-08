import React from "react";
import { Menu, Button, Table, Space, Pagination } from "antd";
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
      total: 1,
    };
  }
  componentDidMount() {
    console.log("主页面第一次");
    ipcRenderer.on("getTracks", (event, tracks) => {
      console.log("主页面", tracks);
      tracks.map((item) => {
        item.key = item.id;
        return item;
      });
      this.setState({
        data: tracks,
        total: tracks.length,
      });
      allTracks = tracks;
    });
    console.log(this.state);
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
    console.log(typeof this.state.data.length);
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <div style={{ height: "48px" }}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item key="mail" icon={<MailOutlined />}>
              全部音乐列表
            </Menu.Item>
            <Menu.Item key="app" icon={<AppstoreOutlined />}>
              热门列表
            </Menu.Item>
            <SubMenu icon={<SettingOutlined />} title="个人音乐">
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
                播放记录
              </a>
            </Menu.Item>
          </Menu>
        </div>
        <header style={{ textAlign: "center", padding: "10px" }}>
          <h2>个人音乐播放器</h2>
        </header>
        <nav style={{ padding: "10px" }}>
          <Button type="primary" onClick={this.sendClick.bind(this)}>
            添加歌曲到曲库
          </Button>
        </nav>
        <div style={{ flex: "1", overflowY: "scroll" }}>
          <Table
            columns={columns({ playAudio: this.playAudio })}
            dataSource={this.state.data}
            pagination={false}
          />
        </div>
        <div
          style={{
            height: "50px",
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "20px",
          }}
        >
          <Pagination
            defaultCurrent={1}
            total={this.state.total}
            pageSize={10}
          />
        </div>
        <audio id="audio" src={mpv}></audio>
      </div>
    );
  }
}

export default AntZone;
