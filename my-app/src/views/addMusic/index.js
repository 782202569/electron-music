import React from "react";
import { Button } from "antd";
const path = require("path");
const { ipcRenderer } = window.require("electron");
class addMusic extends React.Component {
  name_with_namespace;
  constructor(props, context) {
    super(props, context);
    this.state = {
      current: "mail",
      musicFilesPath: [],
    };
  }
  /* componentDidMount() {
    console.log("生命周期");
    ipcRenderer.on("selectFile", (event, path) => {
      console.log(path);
      if (Array.isArray(path)) {
        this.setState({
          musicFilesPath: path,
        });
        console.log(path);
      }
    });
  } */
  chioceMusic = (e) => {
    console.log("click ", e);
    ipcRenderer.send("chioce-music-window");
    ipcRenderer.on("selectFile", (event, path) => {
      console.log(path);
      if (Array.isArray(path)) {
        this.setState({
          musicFilesPath: path,
        });
        console.log(path);
      }
    });
  };
  exportMusic = (e) => {
    ipcRenderer.send("add-tracks", this.state.musicFilesPath);
  };
  render() {
    return (
      <div>
        <h2>选择音乐</h2>
        <div>
          <Button onClick={this.chioceMusic.bind(this)}>选择音乐</Button>
          <Button onClick={this.exportMusic.bind(this)}>导入音乐</Button>
        </div>
        <div>
          {this.state.musicFilesPath.map((item, index) => {
            return <div key={index}>{path.basename(item)}</div>;
          })}
        </div>
      </div>
    );
  }
}

export default addMusic;
