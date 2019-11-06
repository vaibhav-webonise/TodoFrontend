import React from "react";
export const AddTodo = (props) => {

  return (
    <div>
      <label for="description">Enter todo </label><input type="text" name="description" value={props.desc} onChange={props.onUserType} />
      <input onClick={props.onAddTodo} type="button" id="addButton" value={props.buttonText} />
    </div>
  )
}
