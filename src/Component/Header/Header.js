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
  const [info, setInfo] = useState([]);
  const [anchorElNav, setAnchorElNav] = useState(null);
  let userType = localStorage.getItem("userType");
  const navigate = useNavigate();
  useEffect(() => {
    // userInfo();
    log();
  }, []);

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
    userInfo();
      setIsLog(true);
    } else {
      setIsLog(false);
    }
  };
  const logOut = () => {
    localStorage.clear();
    setIsLog(false);
  };
  // eslint-disable-next-line
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
      sx={{
        background: "white",
        color: "black",
        boxShadow: "none",
        height:"fit-content",
      }}
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
                    <Link to="/">الرئيسية</Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to="/tips">طرق العنايه بالنباتات</Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to="/problems">مشاكل وحلول</Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to="/store">
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
              <img
                src={logo}
                alt=""
                className="logo"
                component="div"
                sx={{ mr: 1, display: { xs: "none", md: "flex" } }}
              />
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 3, display: "block" }}
              >
                <Link to="/">الرئيسية</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 3, display: "block" }}
              >
                <Link to="/tips">طرق العنايه بالنباتات</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 3, display: "block" }}
              >
                <Link to="/problems">مشاكل وحلول</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 3, display: "block" }}
              >
                <Link to="/store">
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
                sx={{ mt: "77px" }}
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
                className="menu"
              >
                <MenuItem onClick={handleClose}>
                  <Link to={`/profile/${state.signIn.id}`}>الحساب</Link>
                </MenuItem>

                {/* Dashboard bar */}
                {userType === "admin" ? (
                  <MenuItem onClick={handleClose}>
                    <Link to="/dashboard">لوحة التحكم</Link>
                  </MenuItem>
                ) : (
                  <div></div>
                )}
                <MenuItem onClick={handleClose}>
                  <Link to="/" onClick={logOut}>
                    تسجيل الخروج
                    <MdOutlineLogout />
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      ) : (
        // if the user didnt sign in 
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
              <Link to="/">
                <img
                  src={logo}
                  alt=""
                  className="logo"
                  component="div"
                  sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                />
              </Link>
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
                    <Link to="/">الرئيسية</Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to="/tips">طرق العنايه بالنباتات</Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to="/problems">مشاكل وحلول</Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to="/store">
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
              <img
                src={logo}
                alt=""
                className="logo"
                component="div"
                sx={{ mr: 1, display: { xs: "none", md: "flex" } }}
              />
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 3, display: "block" }}
              >
                <Link to="/">الرئيسية</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 3, display: "block" }}
              >
                <Link to="/tips">طرق العنايه بالنباتات</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 3, display: "block" }}
              >
                <Link to="/problems">مشاكل وحلول</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 3, display: "block" }}
              >
                <Link to="/store">
                  المتجر <IoStorefrontOutline />
                </Link>
              </Button>
            </Box>
              <Button sx={{ my: 3, display: "block" }} className="nav-link">
                <Link to="/register">
                  تسجيل جديد 
                </Link>
              </Button>
              <Button sx={{ my: 3, display: "block" }} className="nav-link">
                <Link to="/login">
                  تسجيل الدخول <MdLogin />
                </Link>
              </Button>
          </Toolbar>
        </Container>
      )}
    </AppBar>
  );
};

export default Header;
