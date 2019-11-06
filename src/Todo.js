import React from "react";
import { AddTodo } from "./AddTodo";
import { ListTodo } from "./ListTodo";
import axios from "axios";
import './todo.css';
export class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            desc: "",
            todos: [],
            updateFlag: false,
            id: 1,
            buttonText: "Add"
        };
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "http://localhost:8080/todos"
        }).then((response) => {
            this.setState({
                todos: response.data
            })
        }).catch((err) => {
            console.error(err);
        })
    }

    onUserType = event => {
        let value = event.target.value;
        this.setState({
            desc: value
        });
    };

    onAddTodo = () => {
        if (this.state.desc === '') {
            alert('Fields can not be empty..');
        }
        else {
            if (this.state.updateFlag) {
                this.editTodo();
            }
            else {
                let desc = this.state.desc;
                axios({
                    method: "post",
                    url: "http://localhost:8080/todos",
                    data: {
                        desc: desc
                    }
                }).then((response) => {
                    let todo = response.data;
                    let todos = [...this.state.todos, todo];
                    this.setState({
                        desc: "",
                        todos: todos
                    });
                }).catch((error) => {
                    alert(error);
                })
            }
        }
    }

    onDelete = (paramId) => {
        axios({
            method: "delete",
            url: `http://localhost:8080/todos/${paramId}`
        }).then(() => {
            let todos = this.state.todos.filter((todo) => todo.id !== paramId);
            this.setState({
                todos: todos
            })
        }).catch((error) => {
            alert(error);
        })
    }

    onEdit = (paramId) => {
        let tempDesc
        let todo = this.state.todos;
        for (let index = 0; index < todo.length; index++) {
            if (todo[index].id === paramId) {
                tempDesc = todo[index].desc
            }
        }
        this.setState({
            desc: tempDesc,
            buttonText: "update"
        });
        this.state.updateFlag = true;
        this.state.editId = paramId
    }

    editTodo = () => {
        axios({
            method: "put",
            url: `http://localhost:8080/todos`,

            data: {
                id: this.state.editId,
                desc: this.state.desc
            }
        }).then(() => {
            let tempTodos = this.state.todos;
            for (let index = 0; index < tempTodos.length; index++) {
                if (tempTodos[index].id == this.state.editId) {
                    tempTodos[index].desc = this.state.desc;
                }
            }
            this.setState({
                todos: tempTodos,
                desc: '',
                isUpdate: false,
                buttonText: "Add"
            })
        }).catch((error) => {
            alert(error);
        })
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
