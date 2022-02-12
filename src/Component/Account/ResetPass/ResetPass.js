import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const ResetPass = () => {
  const [password, setPassword] = useState("");

  const passReset = async () => {
    console.log(password);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/reset-pass/:res-token`,
        { password }
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
