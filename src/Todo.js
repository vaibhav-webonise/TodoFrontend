import React from 'react';
import { AddTodo } from './AddTodo';
import { ListTodo } from './ListTodo';
import { todosUrl } from './Urls'
import axios from 'axios';
import './todo.css';
export class Todo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			desc: '',
			todos: [],
			updateFlag: false,
			buttonText: 'Add',
			editId: null,
		};
	}

	componentDidMount() {
		axios({
			method: 'get',
			url: todosUrl
		}).then((response) => {
			this.setState({
				todos: response.data,
			})
		}).catch((error) => {
			console.error(error.response.data);
		})
	}

	onUserType = event => {
		this.setState({
			desc: event.target.value,
		});
	};

	onAddTodo = (event) => {
		event.preventDefault();
		if (this.state.updateFlag) {
			this.editTodo();
		}
		else {
			let desc = this.state.desc;
			axios({
				method: 'post',
				url: todosUrl,
				data: {
					desc: desc,
				}
			}).then((response) => {
				let todos = [...this.state.todos, response.data];
				this.setState({
					desc: '',
					todos,
				});
			}).catch((error) => {
				alert(error);
			})
		}
	}

	editTodo() {
		axios({
			method: 'put',
			url: todosUrl,
			data: {
				id: this.state.editId,
				desc: this.state.desc,
			}
		}).then((response) => {
			if (response) {
				this.state.todos.find(({ id }) => id === this.state.editId).desc = this.state.desc;
				this.setState({
					desc: '',
					updateFlag: false,
					buttonText: 'Add',
				})
			}
		}).catch((error) => {
			alert(error);
		})
	}

	onDelete = (paramId) => {
		axios({
			method: 'delete',
			url: `${todosUrl}/${paramId}`
		}).then((response) => {
			if (response) {
				let todos = this.state.todos.filter((todo) => todo.id !== paramId);
				this.setState({
					todos,
				})
			}
		}).catch((error) => {
			alert(error);
		})
	}

	onEdit = (paramId) => {
		let todoObject = this.state.todos.find(({ id }) => id === paramId);
		this.setState({
			desc: todoObject.desc,
			buttonText: 'update',
			updateFlag: true,
			editId: paramId,
		});
	}

	render() {
		return (
			<div>
				<h3>Your TodoList</h3><br />
				<AddTodo desc={this.state.desc} buttonText={this.state.buttonText} onUserType={this.onUserType} onAddTodo={this.onAddTodo} />
				<ListTodo todos={this.state.todos} onEdit={this.onEdit} onDelete={this.onDelete} />
			</div>
		);
	}
}
