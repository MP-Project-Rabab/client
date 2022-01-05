import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import {
  IconButton,
  TextField,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  Rating,
} from "@mui/material/";
import { FaUserEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
// End of import all dependencies
import "./style.css";

const Profile = () => {
  let { id } = useParams();
  const [userInfo, setUserInfo] = useState({
    userName: "",
    avatar: "",
    location: "",
    certifacte: "",
  });
  useEffect(() => {
    userProfile();
    userProducts()
  }, []);

  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({});
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch()
  const userProfile = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/profile?_id=${id}`,

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

  // Get user Products function
  const userProducts = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/by?user=`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setProduct(result.data)
    } catch (error) {
      console.log(error);
    }
  };
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
      <img src={userInfo.avatar} alt="" className="avatar2" />
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
      {userInfo.userType == "seller" ? (
        <Rating
          name="half-rating"
          defaultValue={0}
          precision={0.5}
          className="rate"
          // onClick={() => addRate(info._id)}
          // onChange={(ev) =>
          //   setRates({ ...rates, rate: ev.target.defaultValue })
          // }
        />
      ) : (
        <></>
      )}
      <h1>اسم المستخدم: </h1>
      <h2>{userInfo.userName} </h2>
      <h1>موقعي:</h1>
      <h3>{userInfo.location} </h3>
    </div>
  );
};

export default Profile;
