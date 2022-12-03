import { useState, useEffect } from "react";
import "./App.css";
import Form from "./Form";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import { Container, Typography } from "@mui/material";
const App = () => {
  const [todos, setTodos] = useState(
    !localStorage.getItem("todos-list")
      ? []
      : JSON.parse(localStorage.getItem("todos-list"))
  );
  console.log(todos);

  //everytime todos list changes, save the current state to local storage
  useEffect(() => {
    localStorage.setItem("todos-list", JSON.stringify(todos));
  }, [todos]);
  const handleMark = (index) => {
    console.log(`you marked ${index}`);
    todos[index].isDone = !todos[index].isDone;
    setTodos([...todos]);
  };
  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };
  const handleDelete = (index) => {
    //delete one item at index given
    todos.splice(index, 1);
    setTodos([...todos]);
  };
  return (
    <Container className="App">
      <Typography variant="h3" style={{ color: "#8be9fd" }}>
        2Do or not 2Do?...
        <br/>
        🧐👇
      </Typography>
      <br />
      {todos.map((todo, index) => (
        <Todo
          key={uuidv4()}
          index={index}
          todo={todo}
          handleMark={handleMark}
          handleDelete={handleDelete}
        />
      ))}
      <Form addTodo={addTodo} />
    </Container>
  );
};

export default App;
