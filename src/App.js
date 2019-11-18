import React from 'react';
import './App.css';
import { Todo } from './Todo';
import Home from './Home';
import login from './Login';
import { NoMatchPage } from './NoMatchPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Signup';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/Signup' component={Signup} />
          <Route path='/login' component={login} />
          <Route exact path='/todos' component={Todo} />
          <Route component={NoMatchPage} />
        </Switch>
      </Router>
    );
  }
}
export default App;
