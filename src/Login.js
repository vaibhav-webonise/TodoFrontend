import React from 'react';
import axios from 'axios';
import './todo.css';
import { logInUrl } from './Urls'

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			cred: {},
			errormessage: '',
		};
	}

	logIn = () => {
		if (!(this.refs.username.value === '' || this.refs.password.value === '')) {
			axios({
				method: 'post',
				url: logInUrl,
				data: {
					username: this.refs.username.value.trim(),
					password: this.refs.password.value.trim(),
				},
			}).then((response) => {
				if (response.data) {
					this.props.history.push('/todo');
				}
			}).catch((error) => {
				this.setState({
					errormessage: error.response.data,
				})
			})
		}
		else {
			this.setState({
				errormessage: 'Fields can not be empty',
			})
		}
	}

	signUp = () => {
		this.props.history.push('/Signup');
	}

	render() {
		return (
			<div>
				<h3>Log In</h3>
				<table>
					<tr>
						<td><label for='Username'>Username</label></td>
						<td><input type='text' name='username' ref='username' placeholder='Username' /></td>
					</tr>
					<tr>
						<td><label for='Password'>Password</label></td>
						<td><input type='password' name='password' ref='password' placeholder='Password' /></td>
					</tr>
				</table><br />
				<input onClick={this.logIn} type='button' value='login' />
				<input onClick={this.signUp} type='button' value='Signup' />
				<h4>{this.state.errormessage}</h4><br />
			</div>
		)
	}
}
export default Home
