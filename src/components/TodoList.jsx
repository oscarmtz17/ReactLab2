// TodoList.js
import React, { useState, useEffect } from "react";

const TodoList = () => {
  // State variable for the todo list
  const [todos, setTodos] = useState([
    { id: 1, title: "Learn React" },
    { id: 2, title: "Build a React app" },
    { id: 3, title: "Have fun!" },
  ]);

  // State variable for the new todo item
  const [newTodo, setNewTodo] = useState("");

  // Event handler for input field change
  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  // Event handler for adding a new todo item
  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = { id: Date.now(), title: newTodo };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  // useEffect hook to fetch data from an API when the component mounts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) =>
        setTodos((prevTodos) => [...prevTodos, ...data.slice(0, 5)])
      ); // Append fetched data to existing todos
  }, []);

  // useEffect hook to log messages whenever the todo list is updated
  useEffect(() => {
    console.log("Todo list updated:", todos);
  }, [todos]);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Add a new todo..."
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
    </div>
  );
};

export default TodoList;
