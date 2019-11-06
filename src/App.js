import React from "react";
import "./App.css";
import { Todo } from "./Todo";
import Home from "./Login"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Signup";

class App extends React.Component {
  render() {
    return (
      <Router >
      <Switch>
          <Route exact path="/todo" component={Todo} />
          <Route exact path="/Signup" component={Signup} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
