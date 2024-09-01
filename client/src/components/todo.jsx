import React from "react";

const TodoItem = ({ todo, onToggleComplete, onDelete }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo._id, !todo.completed)}
      />
      <span className={todo.completed ? "completed" : ""}>{todo.task}</span>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
