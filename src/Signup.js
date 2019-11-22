import React from 'react';
import axios from 'axios';
import './todo.css';
import { constants } from './AppConstants'

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      infoMessage: '',
      userName: '',
      password: '',
      confirmPassword: '',
    };
  }

  onUserType = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  signUp = (event) => {
    event.preventDefault();
    const { password, confirmPassword, userName } = this.state;
    if (password.length > 5) {
      if (password === confirmPassword) {
        axios({
          method: 'post',
          url: `${constants.URL}/signup`,
          data: {
            username: userName.trim(),
            password: password.trim(),
          }
        }).then((response) => {
          if (response.status === 200) {
            this.setState({ infoMessage: 'Registration successful', })
            this.setState({
              confirmPassword: '',
              password: '',
              userName: '',
            })
          }
        }).catch((error) => {
          if (error.message === constants.NETWORK_ERROR) {
            this.setState({ infoMessage: error.message })
          } else if (error.response.status === 409) {
            this.setState({ infoMessage: 'user already exists' })
          }
        })
      }
      else {
        this.setState({ infoMessage: 'Password does not match' })
      }
    } else {
      this.setState({ infoMessage: 'Password must have atleast 6 character' })
    }
  }

  logIn = () => {
    this.props.history.push('/login');
  }

  render() {
    const { userName, password, confirmPassword } = this.state;
    return (
      <div>
        <h3>Sign up</h3>
        <form onSubmit={this.signUp}>
          <table>
            <tr>
              <td><label for='Username'>Username</label></td>
              <td><input type='text' name='userName' onChange={this.onUserType} value={userName} placeholder='Username' required /></td>
            </tr>
            <tr>
              <td><label for='Password'>Password</label></td>
              <td><input type='password' name='password' onChange={this.onUserType} value={password} placeholder='Password' required /></td>
            </tr>
            <tr>
              <td><label for='Re-enter password'>Re-enter password</label></td>
              <td><input type='password' name='confirmPassword' onChange={this.onUserType} value={confirmPassword} placeholder='Re-enter password' required /></td>
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
