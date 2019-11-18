import React from 'react';
import axios from 'axios';
import './todo.css';
import { signUpUrl } from './Urls'

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      cred: {},
      infoMessage: '',
      userName: '',
      password: '',
      confirmPassword: '',
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

  onConfirmPasswordType = event => {
    this.setState({
      confirmPassword: event.target.value,
    });
  };

  signUp = (event) => {
    event.preventDefault();
    if (this.state.password.length > 5) {
      if (this.password === this.confirmPassword) {
        axios({
          method: 'post',
          url: signUpUrl,
          data: {
            username: this.state.userName.trim(),
            password: this.state.password.trim(),
          }
        }).then((response) => {
          if (response.status === 200) {
            this.setState({
              infoMessage: 'Registration successful',
            })
            this.setState({
              confirmPassword: '',
              password: '',
              userName: '',
            })
          }
        }).catch((error) => {
          if (error.message === 'Network Error') {
            this.setState({
              infoMessage: error.message
            })
          } else if (error.response.status === 409) {
            this.setState({
              infoMessage: 'user already exists'
            })
          }
        })
      }
      else {
        this.setState({
          infoMessage: 'Password does not match'
        })
      }
    } else {
      this.setState({
        infoMessage: 'Password must have atleast 6 character'
      })
    }
  }

  logIn = () => {
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <h3>Sign up</h3>
        <form onSubmit={this.signUp}>
          <table>
            <tr>
              <td><label for='Username'>Username</label></td>
              <td><input type='text' onChange={this.onUserNameType} value={this.state.userName} onUserNameType placeholder='Username' required /></td>
            </tr>
            <tr>
              <td><label for='Password'>Password</label></td>
              <td><input type='password' onChange={this.onPasswordType} value={this.state.password} placeholder='Password' required /></td>
            </tr>
            <tr>
              <td><label for='Re-enter password'>Re-enter password</label></td>
              <td><input type='password' onChange={this.onConfirmPasswordType} value={this.state.confirmPassword} placeholder='Re-enter password' required /></td>
            </tr>
          </table><br />
          <input type='submit' value='Signup' />
          <input onClick={this.logIn} type='button' value='LogIn' />
        </form>
        <h4>{this.state.infoMessage}</h4>
      </div>
    )
  }
}
export default Signup
