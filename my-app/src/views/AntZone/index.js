import React from "react";
import {
  Layout,
  Menu,
  Icon,
  Tooltip,
  Select,
  Input,
  Button,
  message,
} from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./index.less";
/*import io from 'socket.io-client'*/
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;
const { ipcRenderer } = window.require("electron");
/*const socket = io('ws://127.0.0.1:7000')*/

class AntZone extends React.Component {
  name_with_namespace;
  constructor(props, context) {
    super(props, context);
    this.state = {
      current: "mail",
    };
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
      </div>
    );
  }
}

export default AntZone;
