import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import {
  getinfo
} from "../../reducers/user";
import { GiFlowerPot } from "react-icons/gi";
import {
  Avatar,
  Badge,
  IconButton,
  Collapse,
  Box,
  Menu,
  MenuItem,
} from "@mui/material/";
import { useSelector, useDispatch } from "react-redux";
import { FaEllipsisV } from "react-icons/fa";
import "./header.css";
import logo from "../../img/logo.png";

const Header = () => {
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  //  MUI AppBar
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClose = () => {
    setAnchorElUser(null);
  };

  // ////////////////////////////
  const [isLog, setIsLog] = useState(false);
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState([
    // products: [],
    // quantity: 0,
    // total: 0
  ]);

  const navigate = useNavigate();
  useEffect(() => {
    userInfo()
    let userid = localStorage.getItem("id");
    if (userid) {
      setIsLog(true);
      setUser(userid);
    } else {

      setIsLog(false);
      navigate("/login");
    }
  },[]);

  const logOut = () => {
    localStorage.clear();
  };
  const userInfo= async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/profile?_id=${state.signIn.id}`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      dispatch(getinfo(result.data));
    } catch (error) {
      console.log(error);
    }
  };
  
  console.log(state.userReducer.cart);
  return (
    <div className="header">
      {isLog ? (
        <header>
          {/* {info.cart.map((el) => <h4>{el._id}</h4>)} */}
          {/* <h4>{info.cart._id}</h4> */}
          <img src={logo} alt="" className="logo" />
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
          <Badge badgeContent={0} color="success">
            <GiFlowerPot className="cart" onClick={() => navigate("/cart")}/>
          </Badge>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                className="avatar"
                alt="avatar"
                src={state.userReducer.avatar}
                sx={{ width: 56, height: 56 }}
              />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/profile">البروفايل</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/" onClick={logOut}>
                  تسجيل الخروج
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </header>
      
      ) : (
        <header>
          <img src={logo} alt="" className="logo" />
          <div className="acut"> 
          {/* <Link to="/register">تسجيل جديد؟</Link> */}
          <Link to="/login">تسجيل الدخول</Link>
          </div>
        </header>
      )}
    </div>
  );
};

export default Header;
