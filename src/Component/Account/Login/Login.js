import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Stack, TextField, Button, Container } from "@mui/material";
import { logIn } from "../../../reducers/login";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();

  const [log, setLogIn] = useState({
    email: "",
    password: "",
  });

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
      result.status === 400
        ? setMsg("الإيميل أو كلمة السر غير صحيح")
        : setMsg("تم تسجيل الدخول");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
      <Container maxWidth="sm" className="login"> 
        <Stack spacing={5} className="register-form">
          {/* Email Field */}
          <TextField
            required
            id="standard-required"
            label="الإيميل"
            type="email"
            variant="standard"
            value={log.email}
            onChange={(ev) => setLogIn({ ...log, email: ev.target.value })}
          />

          {/* Password Field */}
          <TextField
            required
            id="standard-password-input"
            label="كلمة المرور"
            type="password"
            autoComplete="current-password"
            variant="standard"
            value={log.password}
            onChange={(ev) => setLogIn({ ...log, password: ev.target.value })}
          />

          <Button onClick={userLog}>
            تسجيل الدخول
          </Button>
          <Link to="/forget" className="register">
            نسيت كلمة المرور؟
          </Link>
          <h4>
            ليس لديك حساب؟
            <Link to="/register" className="register">
              تسجيل جديد
            </Link>
          </h4>
        </Stack>
      <h1 className="msg">{msg}</h1>
      </Container>
    
  );
};

export default Login;
