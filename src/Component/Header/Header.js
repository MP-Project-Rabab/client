import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GiFlowerPot } from "react-icons/gi";
import { MdOutlineLogout, MdLogin } from "react-icons/md";
import {
  Avatar,
  Badge,
  IconButton,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { IoStorefrontOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
// End of import all dependencies
import "./header.css";
import logo from "../../img/logo.png";

const Header = () => {
  const [cart, setCart] = useState([]);

  const state = useSelector((state) => {
    return state;
  });

  // Dashboard Bar
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDashboardClose = () => {
    setAnchorEl(null);
  };

  // user  MUI AppBar
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

  const [info, setInfo] = useState([]);
  let userType = localStorage.getItem("userType");
  const navigate = useNavigate();
  useEffect(() => {
    userInfo();
    log();
  }, []);

  let userid = localStorage.getItem("id");
  const log = () => {
    if (userid) {
      setIsLog(true);
      setUser(userid);
    } else {
      setIsLog(false);
      navigate("/login");
    }
  };
  const logOut = () => {
    localStorage.clear();
    setIsLog(false);
    setUser("");
  };
  const userInfo = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/profile?_id=${state.signIn.id}`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setInfo(result.data);
      setCart(result.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="header">
      {isLog ? (
        <header>
          <img src={logo} alt="" className="logo" />
          <nav className="nav">
            <Button sx={{ my: 2, color: "white"}}>
              <Link to="/">الرئيسية</Link>
            </Button>
            <Button sx={{ my: 2, color: "white"}}>
              <Link to="/tips">طرق العنايه بالنباتات</Link>
            </Button>
            <Button sx={{ my: 2, color: "white"}}>
              <Link to="/problems">المشاكل والحلول</Link>
            </Button>
            <Button sx={{ my: 2, color: "white"}}>
              <Link to="/products">
                المتجر <IoStorefrontOutline />
              </Link>
            </Button>
          </nav>
          {/* Dashboard bar */}
          {userType == "admin" ? (
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Dashboard
            </Button>
          ) : (
            <></>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleDashboardClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleDashboardClose}>
              <Link to="/users">المستخدمين</Link>
            </MenuItem>
            <MenuItem onClick={handleDashboardClose}>
              {" "}
              <Link to="/productsApprove">منتجات تحتاج للتأكيد</Link>
            </MenuItem>
            <MenuItem onClick={handleDashboardClose}>
              <Link to="/postsApprove">postsApprove</Link>
            </MenuItem>
          </Menu>
          <h4 className="nav-cart">
            <Badge badgeContent={cart.length} color="success">
              <GiFlowerPot className="cart" onClick={() => navigate("/cart")} />
            </Badge>
            السلة
          </h4>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                className="avatar"
                alt="avatar"
                src={info.avatar}
                sx={{ width: 90, height: 90 }}
              />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleClose}>
                <Link to={`/profile/${state.signIn.id}`}>البروفايل</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/" onClick={logOut}>
                  تسجيل الخروج
                  <MdOutlineLogout />
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
            <Link to="/login">
              تسجيل الدخول <MdLogin />{" "}
            </Link>
          </div>
        </header>
      )}
    </div>
  );
};

export default Header;
