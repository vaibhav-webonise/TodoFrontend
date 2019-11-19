import React from 'react';
import axios from 'axios';
import './todo.css';
import { logInUrl } from './Urls'

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      infoMessage: null,
      userName: '',
      password: '',
    };
  }

  onUserNameType = event => {
    this.setState({
      userName: event.target.value,
    });
  };

  onPasswordType = event => {
    this.setState({
      password: event.target.value,
    });
  };

  logIn = (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: logInUrl,
      data: {
        username: this.state.userName.trim(),
        password: this.state.password.trim(),
      },
    }).then((response) => {
      if (response.status === 200) {
        localStorage.setItem('token', response.data.jwt);
        console.log(localStorage.getItem('token'));
        this.props.history.push('/todos');
      }
    }).catch((error) => {
      if (error.message === 'Network Error') {
        this.setState({
          infoMessage: error.message
        })
      } else if (error.response.status === 404) {
        this.setState({
          infoMessage: 'user not exists, You need to sign up'
        })
      } else if (error.response.status === 412) {
        this.setState({
          infoMessage: 'Invalid password'
        })
      }
    })
  }

  signUp = () => {
    this.props.history.push('/signup');
  }

  render() {
    if (localStorage.key('token') !== null) {
      return (<h3>Already logged in</h3>)
    }
    else {
      return (
        <div>
          <h3>Log In</h3>
          <form onSubmit={this.logIn}>
            <table>
              <tr>
                <td><label for='Username'>Username</label></td>
                <td><input type='text' name='username' onChange={this.onUserNameType} value={this.userName} placeholder='Username' required /></td>
              </tr>
              <tr>
                <td><label for='Password'>Password</label></td>
                <td><input type='password' name='password' onChange={this.onPasswordType} value={this.password} placeholder='Password' required /></td>
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
}
export default Login
