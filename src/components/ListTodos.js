import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  // Manage Modal State
  const [modalIsOpen, setModalIsOpen] = useState({
    modalShow: false,
    modalData: {},
  });

  function openFromParent(data) {
    setModalIsOpen({
      modalShow: true,
      modalData: data,
    });
  }

  function handleCloseModal() {
    setModalIsOpen({
      modalShow: false,
      modalData: {},
    });
  }

  // DELETE TODO by ID
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // GET ALL TODO'S
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  // useEffect - run only single time
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <Grid container justifyContent="center" style={{ marginTop: 60 }}>
        <Grid item xs={12} sm={8} lg={6}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table aria-labelledby="tableTitle">
                {/* COLUMN'S */}
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ fontWeight: "bold" }}>
                      Description
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Edit
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* ROW'S */}
                  {todos.map((todo) => {
                    return (
                      <TableRow key={todo.todo_id}>
                        <TableCell align="left">{todo.description}</TableCell>
                        <TableCell align="center">
                          <button
                            className="btn btn-danger"
                            onClick={() => openFromParent(todo)}
                            style={{ cursor: "pointer" }}
                          >
                            Edit
                          </button>
                        </TableCell>
                        <TableCell align="center">
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteTodo(todo.todo_id)}
                            style={{ cursor: "pointer" }}
                          >
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {todos.length === 0 && (
                    <TableRow>
                      <TableCell align="center" colSpan={3}>
                        Empty List!!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <EditTodo IsModalOpened={modalIsOpen} onCloseModal={handleCloseModal} />
    </>
  );
};

export default ListTodos;
