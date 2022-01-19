import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
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
  }, []);

  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState({});
  const state = useSelector((state) => {
    return state;
  });

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
      setProducts(result.data.shop);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    userProfile();
    setOpen(false);
  };

  return (
    <div className="profile">
      <div className="profile-item">
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={handleClickOpen}
      >
        <FaUserEdit />
      </IconButton>
      <img src={userInfo.avatar} alt="" className="avatar2" />
      {userInfo.userType === "seller" ? (
        <Rating
          name="half-rating"
          defaultValue={0}
          precision={0.5}
          className="rate2"
          // onClick={() => addRate(info._id)}
          // onChange={(ev) =>
          //   setRates({ ...rates, rate: ev.target.defaultValue })
          // }
        />
      ) : (
        <></>
      )}
      <h2>{userInfo.userName} </h2>
      <h1>موقعي:</h1>
      <h3>{userInfo.location} </h3>
      
      </div>
     
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64, base64: string }) =>
              setUserInfo({ ...userInfo, avatar: base64 })
            }
          />
          certifacte
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64, base64: string }) =>
              setUserInfo({ ...userInfo, certifacte: base64 })
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
     
      {userInfo.userType === "seller" ? (
       <>
        {products.length &&
          products.map((info) => {
          
            return (
              <div key={info._id} className="products-card">
                <img src={info.img} alt="" />
                <h2>{info.name}</h2>
                <h5>متوفر:{info.Quantity} </h5>
                <h4>{info.price} ر.س</h4>
              </div>
            );
          })}
       </>
      ) : (
        <></>
      )}
     
    </div>
  );
};

export default Profile;
