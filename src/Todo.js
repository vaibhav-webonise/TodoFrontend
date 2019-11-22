import React from 'react';
import { AddTodo } from './AddTodo';
import { ListTodo } from './ListTodo';
import { constants } from './AppConstants'
import axios from 'axios';
import { Link } from 'react-router-dom'
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
      PAGE_NO: 0,
    };
  }

  componentDidMount() {
    if (localStorage.getItem(constants.TOKEN) === null) {
      return;
    }
    else {
      this.getRequest();
      this.setState((prevState) => ({ PAGE_NO: prevState.PAGE_NO + constants.INCREMENT_COUNT, }));
    }
  }

  getRequest = () => {
    axios({
      method: 'GET',
      url: `${constants.URL}/todos/${this.state.PAGE_NO}`,
      headers:
      {
        'Authorization': `Bearer ${localStorage.getItem(constants.TOKEN)}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        this.setState({ todos: [...this.state.todos, response.data[i]] });
      }
    }).catch((error) => {
      if (!error.response.status === constants.NOT_FOUND) {
        alert(error.message);
        this.onLogOut();
      }
    })
  }

  onUserType = event => {
    this.setState({ desc: event.target.value, });
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
        url: `${constants.URL}/todos`,
        data: {
          desc: desc,
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem(constants.TOKEN)}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        let todos = [...this.state.todos, response.data];
        this.setState({ desc: '', todos, });
      }).catch((error) => {
        alert(error.message)
        this.onLogOut();
      })
    }
  }

  editTodo() {
    axios({
      method: 'PUT',
      url: `${constants.URL}/todos`,
      data: {
        id: this.state.editId,
        desc: this.state.desc,
      },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(constants.TOKEN)}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      if (response.status === constants.OK) {
        this.state.todos.find(({ id }) => id === this.state.editId).desc = this.state.desc;
        this.setState({
          desc: '',
          updateFlag: false,
          buttonText: 'Add',
        })
      }
    }).catch((error) => {
      alert(error.message);
      this.onLogOut();
    })
  }

  onDelete = (paramId) => {
    axios({
      method: 'DELETE',
      url: `${constants.URL}/todos/${paramId}`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(constants.TOKEN)}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      if (response.status === constants.OK) {
        let todos = this.state.todos.filter((todo) => todo.id !== paramId);
        this.setState({ todos, })
      }
    }).catch((error) => {
      alert(error.message);
      this.onLogOut();
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
    localStorage.removeItem(constants.TOKEN);
    this.props.history.push('/login');
  }

  incrementPageNo = () => {
    this.setState((prevState) => ({ PAGE_NO: prevState.PAGE_NO + constants.INCREMENT_COUNT, }))
    this.getRequest();
  }

  render() {
    if (localStorage.getItem(constants.TOKEN) === null) {
      return (<h3>you are currently logged out <Link to='/login'>click here</Link> to log in</h3>);
    }
    else {
      return (
        <div>
          <h3>Your TodoList</h3><br />
          <AddTodo desc={this.state.desc} buttonText={this.state.buttonText} onUserType={this.onUserType} onAddTodo={this.onAddTodo} />
          <ListTodo onLogOut={this.onLogOut} todos={this.state.todos} onEdit={this.onEdit} onDelete={this.onDelete} />
          <input onClick={this.incrementPageNo} type='button' value='>' />
        </div>
      );
    }
  }
}
export default Todo
