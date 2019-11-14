import React from 'react';
import axios from 'axios';
import './todo.css';
import { logInUrl } from './Urls'

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      cred: {},
      infoMessage: '',
    };
  }

  logIn = (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: logInUrl,
      data: {
        username: this.refs.username.value.trim(),
        password: this.refs.password.value.trim(),
      },
    }).then((response) => {
      if (response.status === 200) {
        localStorage.setItem('token', response.data.jwt);
        console.log(localStorage.getItem('token'));
        this.props.history.push('/todo');
      }
    }).catch((error) => {
      this.setState({
        infoMessage: error.response.data,
      })
    })
  }

  signUp = () => {
    this.props.history.push('/Signup');
  }

  render() {
    return (
      <div>
        <h3>Log In</h3>
        <form onSubmit={this.logIn}>
          <table>
            <tr>
              <td><label for='Username'>Username</label></td>
              <td><input type='text' name='username' ref='username' placeholder='Username' required /></td>
            </tr>
            <tr>
              <td><label for='Password'>Password</label></td>
              <td><input type='password' name='password' ref='password' placeholder='Password' required /></td>
            </tr>
          </table><br />
          <input type='submit' value='login' />
          <input onClick={this.signUp} type='button' value='Signup' />
        </form>
        <h4>{this.state.infoMessage}</h4><br />
      </div>
    )
  }
}
export default Home
