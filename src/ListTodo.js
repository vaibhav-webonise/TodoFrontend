import React from 'react';
import './todo.css';
import { constants } from './AppConstants'

export const ListTodo = props => {
  let serialNo = constants.INITIAL_SERIAL_NO;
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Description</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {props.todos.map(todo => (
            <tr key={todo.id}>
              <td>{serialNo++}</td>
              <td>{todo.desc}</td>
              <td>
                <button onClick={() => props.onEdit(todo.id)}>Edit</button>
                <button onClick={() => props.onDelete(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <input className="myButton" type='submit' onClick={() => props.onLogOut()} value='Log Out' />
    </div>
  );
};
