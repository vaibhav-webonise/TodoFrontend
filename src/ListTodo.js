import React from 'react';

export const ListTodo = props => {
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
              <td>{todo.id}</td>
              <td>{todo.desc}</td>
              <td>
                <button onClick={() => props.onEdit(todo.id)}>Edit</button>
                <button onClick={() => props.onDelete(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
