import React from "react";
import { useState } from "react";

const TodoItem = ({ todo, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      dispatch({ type: "EDIT_TODO", payload: { id: todo.id, text: editText } });
    }
    setIsEditing(!isEditing);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <span
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.text}
        </span>
      )}
      {/* delete button disabled until check mark is complete */}
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
      <button
        onClick={() => dispatch({ type: "DELETE_TODO", payload: todo.id })}
        disabled={!todo.completed}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
