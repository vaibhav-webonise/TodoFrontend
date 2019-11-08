import React from 'react';
import axios from 'axios';
import './todo.css';

class Signup extends React.Component {
	constructor() {
		super();
		this.state = {
			cred: {},
			errorMessage: '',
		};
	}

	signUp = () => {
		if (this.refs.username.value === '' || this.refs.password.value === '' || this.refs.confirmPassword.value === '') {
			this.setState({
				errorMessage: 'Fields can not be empty'
			})
		}
		else if (this.refs.password.value.length > 5) {
			if (this.refs.password.value === this.refs.confirmPassword.value) {
				axios({
					method: 'post',
					url: 'http://localhost:8080/signIn',
					data: {
						username: this.refs.username.value.trim(),
						password: this.refs.password.value.trim(),
					}
				}).then((response) => {
					if (response) {
						this.setState({
							errorMessage: 'Registration successful',
						})
						this.refs.username.value = '';
						this.refs.password.value = '';
						this.refs.confirmPassword.value = '';
					}
				}).catch((error) => {
					this.setState({
						errorMessage: error.response.data
					})
				})
			}
			else {
				this.setState({
					errorMessage: 'Password does not match'
				})
			}
		} else {
			this.setState({
				errorMessage: 'Password must have atleast 6 character'
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
				<table>
					<tr>
						<td><label for='Username'>Username</label></td>
						<td><input type='text' ref='username' placeholder='Username' /></td>
					</tr>
					<tr>
						<td><label for='Password'>Password</label></td>
						<td><input type='password' ref='password' placeholder='Password' /></td>
					</tr>
					<tr>
						<td><label for='Re-enter password'>Re-enter password</label></td>
						<td><input type='password' ref='confirmPassword' placeholder='Re-enter password' /></td>
					</tr>
				</table><br />
				<input onClick={this.signUp} type='button' value='Signup' />
				<input onClick={this.logIn} type='button' value='LogIn' />
				<h4>{this.state.errorMessage}</h4>
			</div>
		)
	}
}
export default Signup
