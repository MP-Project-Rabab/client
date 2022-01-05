import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Tab, Box, Divider } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { FiEdit3 } from "react-icons/fi";
import {
  TextField,
  Button,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import FileBase from "react-file-base64";

// End of import all dependencies
import "./style.css";
const Post = () => {
  let { id } = useParams();
  useEffect(() => {
    onePost();
  }, []);
  const state = useSelector((state) => {
    return state;
  });
  const [comments, setComments] = useState({});
  const [user, setUser] = useState({});
  const [comment, setcomment] = useState("");
  const [post, setPost] = useState({
    img: "",
    desc: "",
    user: state.signIn.id,
    title: "",
  });
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();

  const onePost = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/onePost?_id=${id}`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );

      setPost(result.data);
      setComments(result.data.commentes);
      setUser(result.data.user);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addComment = async (id) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/comments/add`,
        {
          comment: comment,
          postId: id,
          userId: state.signIn.id,
        },

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );

      setcomment(result.data);
    } catch (error) {
      console.log(error);
    }
    onePost();
  };

  // update post function
  const update = async (id) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/posts/update`,
        {
          title: post.title,
          img: post.img,
          desc: post.desc,
          _id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );

      setPost(result.data);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
    onePost();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="one-post">
      <h1>العنوان: {post.title}</h1>
      <div>
        <FiEdit3 className="edit" onClick={handleClickOpen} />
      </div>
      <Divider />
      <div className="user">
        <img src={user.avatar} alt="" className="avatar2" />
        <h4>{user.userName}</h4>
      </div>
      <img src={post.img} alt="" className="post-img" />

      <p>{post.desc}</p>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="التعليقات:" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {comments.length &&
              comments.map((info, i) => {
                // {console.log(info);}
                return (
                  <div key={i}>
                    <h4>{info.comment}</h4>
                  </div>
                );
              })}
          </TabPanel>
        </TabContext>
      </Box>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        className="textarea"
        defaultValue="اكتب تعلقيك هنا"
        onChange={(ev) => setcomment(ev.target.value)}
      ></textarea>
      <button onClick={() => addComment(post._id)} className="comment-bttn">
        اضف تعليق
      </button>
      {/* For updating post */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64, base64: string }) =>
              setPost({ ...post, img: base64 })
            }
          />
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="العنوان:"
            type="text"
            variant="standard"
            onChange={(ev) => setPost({ ...post, title: ev.target.value })}
          />

          <TextField
            id="standard-textarea"
            label=""
            placeholder="Placeholder"
            multiline
            variant="standard"
            onChange={(ev) => setPost({ ...post, desc: ev.target.value })}
          />
          <DialogActions>
            <Button onClick={handleClose}>تراجع</Button>
            <Button onClick={() => update(post._id)}>اضافه</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Post;
