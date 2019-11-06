import React from 'react';
import axios from "axios";
import history from './history';
import './todo.css';

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            cred: {}
        };
    }

    setUsername = event => {
        let value = event.target.value;
        this.setState({
            username: value
        });
    };

    setPassword = event => {
        let value = event.target.value;
        this.setState({
            password: value
        });
    };

    setConfirmPassword = event => {
        let value = event.target.value;
        this.setState({
            confirmPassword: value
        });
    }

    signUp = () => {
        if (this.state.username === '' || this.state.password === '') {
            alert('Fields can not be empty');
        }
        else if (this.state.password.length > 5) {
            if (this.state.password === this.state.confirmPassword) {
                axios({
                    method: "post",
                    url: `http://localhost:8080/addUser`,
                    data: {
                        username: this.state.username,
                        password: this.state.password
                    }
                }).then((response) => {
                    if (response) {
                        alert("Registration successful");
                        this.setState({
                            username: '',
                            password: '',
                            confirmPassword: ''
                        })
                    }
                }).catch(() => {
                    alert("Username already exists");
                })
            }
            else {
                alert("password does not matches");
            }
        } else {
            alert("password must have atleast 6 character");
        }
    }

    logIn = () => {
        history.push('/');
        window.location.reload();
    }


    render() {
        return (
            <div>
                <h3>Sign up</h3>
                <table>
                    <tr>
                        <td><label for="Username">Username</label></td>
                        <td><input type="text" name="username" value={this.state.username} onChange={this.setUsername} /></td>
                    </tr>
                    <tr>
                        <td><label for="Password">Password</label></td>
                        <td><input type="password" name="password" value={this.state.password} onChange={this.setPassword} /></td>
                    </tr>
                    <tr>
                        <td><label for="Re-enter password">Re-enter password</label></td>
                        <td><input type="password" name="number" value={this.state.confirmPassword} onChange={this.setConfirmPassword} /></td>
                    </tr>
                </table><br />
                <input onClick={this.signUp} type="button" value="Signup" />
                <input onClick={this.logIn} type="button" value="LogIn" />
            </div>
        )
    }

}
export default Signup
