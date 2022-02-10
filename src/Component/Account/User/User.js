import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  IconButton,
  TextField,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material/";
import { FiEdit3 } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";

import "./style.css";

const User = () => {
  const [users, setUsers] = useState({});
  const [userId, setUserId] = useState("");
  const [type, setType] = useState("");
  useEffect(() => {
    allUser();
  }, []);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const state = useSelector((state) => {
    return state;
  });

  // Get All Users function
  const allUser = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setUsers(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/user/delete?_id=${userId}`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      console.log(result.data);
      setUsers(result.data);
    } catch (error) {
      console.log(error);
    }
    setAlert(false);
    allUser();
  };

  const updateUserType = async () => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/user-type`,
        { _id: userId, userType: type },

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setType(result.data);
    } catch (error) {
      console.log(error);
    }

    setOpen(false);
    allUser();
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setUserId(id);
  };

  const handleClose = () => {
    allUser();
    setOpen(false);
  };

  // Confirmation Alert for deleting user
  const alertOpen = (id) => {
    setAlert(true);
    setUserId(id);
  };

  const alertClose = () => {
    setAlert(false);
  };
  return (
    <div className="users">
      <TableContainer
        component={Paper}
        style={{
          width: "auto",
          height: "40rem",
          padding: "7px",
          margin: "auto",
        }}
      >
        <h1 className="h11">قائمة المستخدمين</h1>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="right"></TableCell>
              <TableCell align="right">اسم المستخدم</TableCell>
              <TableCell align="right">نوع المستخدم</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length &&
              users.map((user, i) => {
                return (
                  <TableRow
                    key={i}
                    className="cart-card"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="right">
                      <img src={user.avatar} alt="" />
                    </TableCell>
                    <TableCell align="right">
                      <h3>{user.userName}</h3>
                    </TableCell>
                    <TableCell align="right">
                      <h4> {user.userType}</h4>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        component="span"
                        onClick={() => handleClickOpen(user._id)}
                      >
                        <FiEdit3 />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="error"
                        component="span"
                        className="delete-icon"
                        onClick={() => alertOpen(user._id)}
                      >
                        <IoTrashOutline />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Alert for deleting user */}
      <Dialog
        open={alert}
        onClose={alertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل أنت متأكد من حذف هذا المستخدم؟"}
        </DialogTitle>
        <DialogActions>
          <Button color="error" onClick={deleteUser}>
            حذف
          </Button>
          <Button onClick={alertClose} autoFocus>
            تراجع
          </Button>
        </DialogActions>
      </Dialog>
      {/* END */}
      {/* Dialog form to change userType */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            name="userType"
            label="تغيير نوع المستخدم"
            type="text"
            fullWidth
            variant="standard"
            onChange={(ev) => setType(ev.target.value)}
          />

          <DialogActions>
            <Button onClick={handleClose}>تراجع</Button>
            <Button onClick={updateUserType}>حفظ</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default User;
