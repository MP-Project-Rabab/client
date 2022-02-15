import React, { useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { useSelector } from "react-redux";
import {TextField, Button} from "@mui/material";
const ResetPass = () => {
  const [password, setPassword] = useState("");
  let { id } = useParams();
  const state = useSelector((state) => {
    return state;
  });
  // console.log(id);

  const passReset = async () => {
    console.log(password);
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/reset-pass/${id}`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${id}`,
          },
        }
      );
      console.log(result.data);
      //   navigate("/")
      // setPassword("Password has been reset");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <TextField
        required
        id="standard-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="standard"
        value={password.Password}
        onChange={(ev) => setPassword(ev.target.value)}
      />

      <Button appearance="primary" onClick={passReset}>
        Submit
      </Button>
    </div>
  );
};

export default ResetPass;
