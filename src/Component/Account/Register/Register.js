import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Stack, TextField, Button, Container } from "@mui/material";

import "./style.css";

const Register = () => {
  const [msg, setMsg] = useState("");
  const [register, setRegister] = useState({
    userName: "",
    email: "",
    password: "",
    role: "61c17ed647031d953256a722",
  });

  const creatUser = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/register`,
        register
      );

      result.status === 210
        ? setMsg("ادخل كلمة سر قويه")
        : setMsg("Active your Email");

      // navigate("/")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    
    <Container maxWidth="sm" className="registe">
        <h1>تسجيل حساب جديد</h1>
        <Stack spacing={5} className="register-form">
          {/* User Name Field */}
          <TextField
            required
            id="standard-required"
            label="اسم المستخدم"
            variant="standard"
            value={register.userName}
            onChange={(ev) =>
              setRegister({ ...register, userName: ev.target.value })
            }
          />

          {/* Email Field */}
          <TextField
            required
            id="standard-required"
            label="الإيميل"
            type="email"
            variant="standard"
            value={register.email}
            onChange={(ev) =>
              setRegister({ ...register, email: ev.target.value })
            }
          />

          {/* Password Field */}
          <TextField
            required
            id="standard-password-input"
            label="كلمة السر"
            type="password"
            autoComplete="current-password"
            variant="standard"
            value={register.password}
            onChange={(ev) =>
              setRegister({ ...register, password: ev.target.value })
            }
          />

          <Button appearance="primary" onClick={creatUser}>
            تسجيل جديد
          </Button>
          <h4>
            هل لديك حساب بالفعل؟
            <Link to="/login" className="register">
            تسجيل الدخول
          </Link>
          </h4>
         
        </Stack>
        <h1>{msg}</h1>
      </Container>
    
  );
};

export default Register;
