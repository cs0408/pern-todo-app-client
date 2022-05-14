import React from "react";

import { Box, Container } from "@mui/material";

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
  return (
    <Box>
      <Container>
        <InputTodo />
        <ListTodos />
      </Container>
    </Box>
  );
}

export default App;
