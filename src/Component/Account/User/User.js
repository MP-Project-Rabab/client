import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  IconButton,
  TextField,
  DialogContent,
  DialogActions,
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
  const deleteUser = async (id) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/user/delete?_id=${id}`,

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
  return (
    <div className="users">
      <TableContainer
        component={Paper}
        style={{
          width: "auto",
          padding: "7px",
          margin: "auto",
        }}
        >
        <h1 className="h11">قائمة المستخدمين</h1>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right"></TableCell>
              <TableCell align="right">اسم المستخدم</TableCell>
              <TableCell align="right">نوع المستخدم</TableCell>
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
                        aria-label="upload picture"
                        component="span"
                        onClick={() => handleClickOpen(user._id)}
                      >
                        <FiEdit3 />
                      </IconButton>
                    </TableCell>
                    <IoTrashOutline
                      onClick={() => deleteUser(user._id)}
                      className="delete-icon"
                    />
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

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
