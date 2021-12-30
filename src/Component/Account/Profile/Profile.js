import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FileBase from "react-file-base64";
import {
  IconButton,
  styled,
  Chip,
  TextField,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from "@mui/material/";
import { BsFillCameraFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import "./style.css";
const Input = styled("input")({
  display: "none",
});

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    avatar: "",
    location: "",
    certifacte: "",
  });
  useEffect(() => {
    userProfile();
  }, []);

  const [open, setOpen] = useState(false);
  const state = useSelector((state) => {
    return state;
  });
  const userProfile = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/profile?_id=${state.signIn.id}`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setUserInfo(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateProfile = async () => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/update`,
        userInfo,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setUserInfo(result.data);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
    userProfile();
  };
  console.log(userInfo);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    userProfile();
    setOpen(false);
  };
  return (
    <div className="profile">
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={handleClickOpen}
      >
        <FaUserEdit />
      </IconButton>
      <img src={userInfo.avatar} alt="" className="avatar" />
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64, base64: string }) =>
              setUserInfo({ ...userInfo, avatar: base64 })
            }
          />
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="اسم المستخدم"
            type="text"
            fullWidth
            variant="standard"
            onChange={(ev) =>
              setUserInfo({ ...userInfo, userName: ev.target.value })
            }
          />
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="الموقع"
            type="text"
            fullWidth
            variant="standard"
            onChange={(ev) =>
              setUserInfo({ ...userInfo, location: ev.target.value })
            }
          />

          <DialogActions>
            <Button onClick={handleClose}>تراجع</Button>
            <Button onClick={updateProfile}>حفظ</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {/* <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={(ev) =>
            setUserInfo({ ...userInfo, avatar: ev.target.files[0] })
          }
          />
      
      </label> */}
      <h1>اسم المستخدم: </h1>
      <h2>{userInfo.userName} </h2>
      <h1>الموقع:</h1>
      <h3>{userInfo.location} </h3>
    </div>
  );
};

export default Profile;
