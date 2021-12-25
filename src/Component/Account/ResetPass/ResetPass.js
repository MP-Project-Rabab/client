import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const ResetPass = () => {
  const [Password, setPass] = useState("");

  const passReset = async () => {
    console.log(Password);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/reset-pass/:res-token`,
        { Password }
      );
      console.log(result.data);
      //   navigate("/")
      setPass("Password has been reset");
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
        value={Password.Password}
        onChange={(ev) => setPass(ev.target.value)}
      />

      <Button appearance="primary" onClick={passReset}>
        Submit
      </Button>
    </div>
  );
};

export default ResetPass;
