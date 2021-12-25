import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { logIn } from "../../../reducers/login";
import { FcGoogle } from "react-icons/fc";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });

  const [log, setLogIn] = useState({
    // userName
    email: "",
    password: "",
  });
  //   A handle function to login with google
  const handleGoogle = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/auth/google`
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  //
  const userLog = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/login`,
        log
      );
      const data = {
        token: result.data.token,
        user: result.data.result,
      };
      dispatch(logIn(data));
      navigate("/");
      console.log(state);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <Container>
        <Stack spacing={5} className="register-form">
          {/* Email Field */}
          <TextField
            required
            id="standard-required"
            label="Email"
            type="email"
            variant="standard"
            value={log.email}
            onChange={(ev) => setLogIn({ ...log, email: ev.target.value })}
          />

          {/* Password Field */}
          <TextField
            required
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            value={log.password}
            onChange={(ev) => setLogIn({ ...log, password: ev.target.value })}
          />

          <Button appearance="primary" onClick={userLog}>
            Login
          </Button>
          <Link to="/forget" className="register">
            Forgot password?
          </Link>

      <h3>
        <FcGoogle className="icon" onClick={handleGoogle} />
        Log in with google
      </h3>
      <h4>
        Dosn't have an account?
        <Link to="/register" className="register">
          Register
        </Link>
      </h4>
        </Stack>
      </Container>
    </div>
  );
};

export default Login;
