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
    };
  }

  signUp = (event) => {
    event.preventDefault();
    if (this.refs.password.value.length > 5) {
      if (this.refs.password.value === this.refs.confirmPassword.value) {
        axios({
          method: 'post',
          url: signUpUrl,
          data: {
            username: this.refs.username.value.trim(),
            password: this.refs.password.value.trim(),
          }
        }).then((response) => {
          if (response.status === 200) {
            this.setState({
              infoMessage: 'Registration successful',
            })
            this.refs.username.value = '';
            this.refs.password.value = '';
            this.refs.confirmPassword.value = '';
          }
        }).catch((error) => {
          this.setState({
            infoMessage: error.response.data
          })
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
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <h3>Sign up</h3>
        <form onSubmit={this.signUp}>
          <table>
            <tr>
              <td><label for='Username'>Username</label></td>
              <td><input type='text' ref='username' placeholder='Username' required /></td>
            </tr>
            <tr>
              <td><label for='Password'>Password</label></td>
              <td><input type='password' ref='password' placeholder='Password' required /></td>
            </tr>
            <tr>
              <td><label for='Re-enter password'>Re-enter password</label></td>
              <td><input type='password' ref='confirmPassword' placeholder='Re-enter password' required /></td>
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
