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
    if (localStorage.getItem('token') === null) {
      return;
    }
    else {
      axios({
        method: 'GET',
        url: todosUrl,
        headers:
        {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        this.setState({
          todos: response.data,
        })
      }).catch((error) => {
        if (error.message === 'Network Error') {
          this.onLogOut();
        }
        console.error(error);
      })
    }
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
        method: 'POST',
        url: todosUrl,
        data: {
          desc: desc,
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
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
      method: 'PUT',
      url: todosUrl,
      data: {
        id: this.state.editId,
        desc: this.state.desc,
      },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
      method: 'DELETE',
      url: `${todosUrl}/${paramId}`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      if (response.status === 200) {
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

  onLogOut = () => {
    localStorage.removeItem('token');
    this.props.history.push('/login');
  }

  render() {
    if (localStorage.getItem('token') === null) {
      return (<h3>you are currently logged out <a href='/login'>click here</a> to log in</h3>);
    }
    else {
      return (
        <div>
          <h3>Your TodoList</h3><br />
          <AddTodo desc={this.state.desc} buttonText={this.state.buttonText} onUserType={this.onUserType} onAddTodo={this.onAddTodo} />
          <ListTodo onLogOut={this.onLogOut} todos={this.state.todos} onEdit={this.onEdit} onDelete={this.onDelete} />
        </div>
      );
    }
  }
}
export default Todo
