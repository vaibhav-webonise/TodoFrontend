import React from 'react';
import './App.css';
import Todo from './Todo';
import Home from './Home';
import login from './Login';
import { NoMatchPage } from './NoMatchPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Signup';
import { Navbar } from './Navbar';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={login} />
          <Route path='/todos' component={Todo} />
          <Route component={NoMatchPage} />
        </Switch>
      </Router>
    );
  }
}
export default App;
