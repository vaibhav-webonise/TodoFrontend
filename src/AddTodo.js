import React from 'react';

export const AddTodo = (props) => {
  return (
    <div>
      <form onSubmit={props.onAddTodo}>
        <label for='description'>Enter todo </label><input type='text' required name='description' value={props.desc} onChange={props.onUserType} />
        <input type='submit' id='addButton' value={props.buttonText} />
      </form>
    </div>
  )
}
