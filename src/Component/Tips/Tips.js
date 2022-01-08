import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPost, newPost, delPost } from "../../reducers/post";
import { Link } from "react-router-dom";
import FileBase from "react-file-base64";
import { BsPatchPlus } from "react-icons/bs";
import {
  TextField,
  Button,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
// End of import all dependencies
import "./style.css";
const Tips = () => {
  useEffect(() => {
    allTip();
  }, []);

  const state = useSelector((state) => {
    return state;
  });
  const [tip, setTip] = useState({
    img: "",
    desc: "",
    user: state.signIn.id,
    isAdvice: true,
    title: "",
  });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // Get All Tip function
  const allTip = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/tips`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      const data = {
        posts: result.data,
      };
      dispatch(getPost(data));
    } catch (error) {
      console.log(error);
    }
  };

  // Add new Tip function
  const newTip = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts/post`,
        tip,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      dispatch(newPost({ posts: result.data }));
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
    allTip();
  };

  // // Delete Tip function
  const deleteTip = async (id) => {
    try {
      const result = await axios.delete(
        `${
          process.env.REACT_APP_BASE_URL
        }/posts/delete?isDeleted=${true}&_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );

      dispatch(delPost(result.data));
    } catch (error) {
      console.log(error);
    }
    allTip();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(state.postReducer.posts.user);
  return (
    <div className="tips">
      <BsPatchPlus onClick={handleClickOpen} className="add2" />
      {state.postReducer.posts.length &&
        state.postReducer.posts.map((info) => {
          return (
            <div key={info._id} className="tips-card">
              <img src={info.img} alt="" />
              <h2>{info.title}</h2>
              <h6>بواسطة: {info.user.userName}</h6>
              {state.signIn.id == info.user._id ||
              state.signIn.userType == "admin" ? (
                <button onClick={() => deleteTip(info._id)}>حذف</button>
              ) : (
                <></>
              )}

              <Link to={`/post/${info._id}`}>أقرأ المزيد...</Link>
            </div>
          );
        })}
      {/* To open a form  */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64, base64: string }) =>
              setTip({ ...tip, img: base64 })
            }
          />
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="العنوان:"
            type="text"
            variant="standard"
            onChange={(ev) => setTip({ ...tip, title: ev.target.value })}
          />

          <TextField
            id="standard-textarea"
            label=""
            placeholder="Placeholder"
            multiline
            variant="standard"
            onChange={(ev) => setTip({ ...tip, desc: ev.target.value })}
          />
          <DialogActions>
            <Button onClick={handleClose}>تراجع</Button>
            <Button onClick={newTip}>اضافه</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tips;
