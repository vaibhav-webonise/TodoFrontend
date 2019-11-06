import React from 'react';
import axios from "axios";
import history from './history';
import './todo.css';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
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

    logIn = () => {
        if (this.state.username === '' || this.state.password === '') {
            alert('Fields can not be empty');
        }
        else {
            axios({
                method: "get",
                url: `http://localhost:8080/getUser/${this.state.username}`
            }).then((response) => {
                this.setState({
                    cred: response.data
                })
                if (this.state.cred.password === this.state.password) {
                    history.push('/todo');
                    window.location.reload();
                }
                else {
                    alert('invalid password');
                }
            }).catch(() => {
                alert("User not exists, you need to sign up");
            })
        }
    }

    signUp = () => {
        history.push('/Signup');
        window.location.reload();
    }

    render() {
        return (
            <div>
                <h3>Log In</h3>
                <table>
                    <tr>
                        <td><label for="Username">Username</label></td>
                        <td><input type="text" name="username" value={this.state.username} onChange={this.setUsername} /></td>
                    </tr>
                    <tr>
                        <td><label for="Password">Password</label></td>
                        <td><input type="password" name="password" value={this.state.password} onChange={this.setPassword} /></td>
                    </tr>
                </table><br />
                <input onClick={this.logIn} type="button" value="login" />
                <input onClick={this.signUp} type="button" value="Signup" />
            </div>
        )
    }
}
export default Home
