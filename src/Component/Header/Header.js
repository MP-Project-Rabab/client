import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImHome } from "react-icons/im";
import Avatar from "@mui/material/Avatar";
import { BsCart4 } from "react-icons/bs";
import "./header.css";
const Header = () => {
  const [isLog, setIsLog] = useState();
  const [user, setUser] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    let userid = localStorage.getItem("id");
    if (userid) {
      setIsLog(true);
      setUser(userid);
    } else {
      setIsLog(false);
      navigate("/");
    }
  }, []);

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="header">
      {isLog ? (
        <header>
          <h1 className="logo">logo</h1>
          <Link to="/" onClick={() => navigate("/")}>
            <ImHome />
          </Link>
          <Link to="/" onClick={logOut}>
            تسجيل الخروج
          </Link>
          <Link to="/users">Users</Link>
          <Link to="/productsApprove">productsApprove</Link>
          <Link to="/postsApprove">postsApprove</Link>
          <Avatar
            className="avatar"
            alt="avatar"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 56, height: 56 }}
            onClick={() => navigate("/profile")}
          />
          <BsCart4 className="cart" onClick={() => navigate("/cart")}/>
        </header>
      ) : (
        <header>
          <h1 className="logo">logo</h1>
          <Link to="/register">تسجيل جديد؟</Link>
          <Link to="/login">تسجيل الدخول</Link>
          <Link to="/" onClick={() => navigate("/")}>
            <ImHome />
          </Link>
        </header>
      )}
    </div>
  );
};

export default Header;
