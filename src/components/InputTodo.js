import React, { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
} from "@mui/material";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/create-todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} lg={6}>
        {/* HEADING */}
        <Typography
          variant="h3"
          component="div"
          textAlign="center"
          margin={4}
          fontWeight="bold"
          color="#1976d2"
        >
          PERN TODO
        </Typography>
        {/* FORM */}
        <Card>
          <CardContent>
            <Stack direction="row" spacing={6}>
              {/* FORM TEXT FIELD */}
              <TextField
                placeholder="Type something..."
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ flex: 1 }}
              />
              {/* FORM BUTTON */}
              <Button onClick={onSubmitForm} variant="contained">
                ADD TODO
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default InputTodo;
