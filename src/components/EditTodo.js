import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
// import Box,
// Button,
// Card,
// CardContent,
// Modal,
// Stack,
// TextField,
// Typography,
// "@mui/material";
import Modal from "react-modal";

const customStyles = {
  content: {
    background: "rgba(0,0,0,0.1)",
    border: "none",
    display: "flex",
    alignItems: "center",
  },
};

const EditTodo = (props) => {
  const [description, setDescription] = useState("");
  const [todo_id, set_todo_id] = useState(0);

  const updateText = async (id) => {
    try {
      const body = { description };

      const res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    props.IsModalOpened.modalData.description &&
      setDescription(props.IsModalOpened.modalData.description);
    props.IsModalOpened.modalData.todo_id &&
      set_todo_id(props.IsModalOpened.modalData.todo_id);
  }, [props.IsModalOpened.modalShow]);

  return (
    <Modal
      isOpen={props.IsModalOpened.modalShow}
      // onAfterOpen={(e) => afterOpenModal(e)}
      style={customStyles}
      ariaHideApp={false}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} xl={6}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                textAlign="center"
                margin={4}
                fontWeight="bold"
                color="#1976d2"
              >
                EDIT TODO
              </Typography>
              <Grid container alignItems={"center"}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Edit Todo"
                    placeholder="Type something..."
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    margin="10px 5px"
                  >
                    <Button
                      variant="contained"
                      onClick={() => updateText(todo_id)}
                    >
                      UPDATE
                    </Button>
                    <Button variant="contained" onClick={props.onCloseModal}>
                      CANCEL
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default EditTodo;
