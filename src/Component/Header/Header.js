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
  Toolbar,
  Container,
  Tooltip,
  AppBar,
  Typography,
} from "@mui/material";
import { IoStorefrontOutline, IoMenu } from "react-icons/io5";
import { useSelector } from "react-redux";
// End of import all dependencies
import "./header.css";
import logo from "../../img/logo.png";

const Header = () => {
  const state = useSelector((state) => {
    return state;
  });
  // ////////////////////////////
  const [cart, setCart] = useState([]);
  const [isLog, setIsLog] = useState(false);
  const [user, setUser] = useState("");
  const [info, setInfo] = useState([]);
  const [anchorElNav, setAnchorElNav] = useState(null);
  let userType = localStorage.getItem("userType");
  const navigate = useNavigate();
  useEffect(() => {
    userInfo();
    log();
  }, []);

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

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
    <AppBar
      position="sticky"
      sx={{ background: "white", color: "black", boxShadow: "none" }}
    >
      {isLog ? (
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* For small screen */}

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <IoMenu />
              </IconButton>
              <img
                src={logo}
                alt=""
                className="logo"
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              />
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
                className="nav"
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {" "}
                    <Link to="/">الرئيسية</Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {" "}
                    <Link to="/tips">طرق العنايه بالنباتات</Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {" "}
                    <Link to="/problems">مشاكل وحلول</Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {" "}
                    <Link to="/products">
                      {" "}
                      المتجر <IoStorefrontOutline />
                    </Link>
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>

            {/* For large screen */}

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              className="nav"
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to="/">الرئيسية</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to="/tips">طرق العنايه بالنباتات</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to="/problems">مشاكل وحلول</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to="/products">
                  المتجر <IoStorefrontOutline />
                </Link>
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}>
              <h4 className="nav-cart">
                <Badge badgeContent={cart.length} color="success">
                  <GiFlowerPot
                    className="cart"
                    onClick={() => navigate("/cart")}
                  />
                </Badge>
                السلة
              </h4>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={info.userName} src={info.avatar} />
                </IconButton>
              </Tooltip>
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
                  <Link to={`/profile/${state.signIn.id}`}>البروفايل</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/" onClick={logOut}>
                    تسجيل الخروج
                    <MdOutlineLogout />
                  </Link>
                </MenuItem>
                {/* Dashboard bar */}
                {userType == "admin" ? (
                  <MenuItem
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <Link to="/dashboard">لوحة التحكم</Link>
                  </MenuItem>
                ) : (
                  <></>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      ) : (
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <img src={logo} alt="" className="logo" />
              <div className="acut">
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  <Link to="/login">
                    تسجيل الدخول <MdLogin />{" "}
                  </Link>
                </Button>
              </div>
            </Box>
          </Toolbar>
        </Container>
      )}
    </AppBar>
  );
};

export default Header;
