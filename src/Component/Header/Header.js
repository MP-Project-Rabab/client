import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { Avatar, Badge, IconButton, Collapse, Box } from "@mui/material/";
import { BsCart4 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { FaEllipsisV } from "react-icons/fa";
import "./header.css";
const Header = () => {
  const state = useSelector((state) => {
    return state;
  });
  const [isLog, setIsLog] = useState();
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);

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
  console.log(state);
  return (
    <div className="header">
      {isLog ? (
        <header>
          <h1 className="logo">أوراقي</h1>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Link to="/users">Users</Link>
              <Link to="/productsApprove">productsApprove</Link>
              <Link to="/postsApprove">postsApprove</Link>
            </Box>
          </Collapse>
          <IconButton onClick={() => setOpen(!open)}>
            <FaEllipsisV />
          </IconButton>
          <Avatar
            className="avatar"
            alt="avatar"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 56, height: 56 }}
            onClick={() => navigate("/profile")}
          />
          <Badge badgeContent={1} color="success">
            <BsCart4 className="cart" onClick={() => navigate("/cart")} />
          </Badge>
          <Link to="/" onClick={logOut}>
            تسجيل الخروج
          </Link>
        </header>
      ) : (
        <header>
          <h1 className="logo">أوراقي</h1>
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
