import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "../App";
import AntZone from "../views/AntZone";
import addMusic from "../views/addMusic";

export default class Routers extends React.Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route exact path="/" component={AntZone}></Route>
            <Route path="/addMusic" component={addMusic}></Route>
          </Switch>
        </App>
      </Router>
    );
  }
}
