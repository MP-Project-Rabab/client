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
} from "@mui/material/";
import { FiEdit3 } from "react-icons/fi";
import "./style.css";

const User = () => {
  const [users, setUsers] = useState({});
  const [type, setType] = useState({});
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
  const updateUserType = async (id) => {
    console.log(id);
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/user-type`,type,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setType(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }

    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    allUser();
    setOpen(false);
  };
  console.log(users);
  return (
    <div className="users">
      {users.length &&
        users.map((user) => {
          return (
            <div key={user._id} className="user-card">
              <img src={user.avatar} alt="" />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={() => handleClickOpen(user._id)}
              >
                <FiEdit3 />
              </IconButton>
              <h2>{user.userName}</h2>

              <h3> نوع المستخدم: {user.userType}</h3>
              <button onClick={() => deleteUser(user._id)}>حذف</button>
            </div>
          )          
        })}
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
                onChange={(ev) => setType({userType:ev.target.value})}
              />

              <DialogActions>
                <Button onClick={handleClose}>تراجع</Button>
                <Button onClick={updateUserType}>
                  حفظ
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
       
    </div>
  );
};

export default User;
