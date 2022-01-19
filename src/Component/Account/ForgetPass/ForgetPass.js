import React, { useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import "./style.css";
const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const forgetPass = async () => {
    console.log(email);
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/forget`,
        { email }
      );

      console.log(result);
      setMsg("Check your Email for resetting your passowrd");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container>
        <Stack spacing={5} className="register-form">
          <h1>أدخل إيميلك لإستعادة كلمة المرور</h1>
          {/* Email Field */}
          <TextField
            required
            id="standard-required"
            label="Email"
            type="email"
            variant="standard"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />

          <Button appearance="primary" onClick={forgetPass}>
            Submit
          </Button>

          <h1>{msg}</h1>
        </Stack>
      </Container>
    </div>
  );
};

export default ForgetPass;
