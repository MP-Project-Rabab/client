import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImHome } from "react-icons/im";
import Avatar from "@mui/material/Avatar";
import "./style.css";

const Nav = () => {
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
    navigate("/");
  };
  console.log(user);
  return (
    <div className="nav">
      {user ? (
        <nav>
          <Link to="/" onClick={() =>  navigate("/")}>
            <ImHome />
          </Link>
          <Link to="/" onClick={logOut}>
            Log out
          </Link>
          <Avatar
            alt="avatar"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 56, height: 56 }}
            onClick={() =>  navigate("/profile")}
          />
        </nav>
      ) : (
        <nav>
             <Link to="/register">
             Register
          </Link>
             <Link to="/login">
             Log In
          </Link>
        </nav>
      )}
    </div>
  );
};

export default Nav;
