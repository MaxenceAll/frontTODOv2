import React from "react";

const TodoList = ({ todos }) => {
  console.log("==========================");
  console.log(todos)
  console.log("==========================");
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default TodoList;
