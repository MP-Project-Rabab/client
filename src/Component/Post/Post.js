import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tab, Box, Divider } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { FiEdit3 } from "react-icons/fi";
import {
  TextField,
  Button,
  DialogContent,
  DialogActions,
  Dialog,
  Container,
} from "@mui/material";
import FileBase from "react-file-base64";
import { CgCloseO } from "react-icons/cg";

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
      setcomment("");
    } catch (error) {
      console.log(error);
    }
    onePost();
  };

  // delete comment function
  const deleteComment = async (id) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/comments/delete?_id=${id}&adminId=${state.signIn.id}`,

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
  // delete comment function
  // eslint-disable-next-line
  const updateComment = async (id) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/comments/update?_id=${id}&comment=${comment}`,

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
    <Container component="div" className="one-post">
      <Box
        sx={{
          flexGrow: 0,
          display: { xs: "flex", md: "flex" },
          flexDirection: "column",
        }}
      >
        <h1>العنوان: {post.title}</h1>
        {state.signIn.id === user._id ? (
          <FiEdit3 className="edit" onClick={handleClickOpen} />
        ) : (
          <></>
        )}
        <Divider />
        <div className="user">
          <img src={user.avatar} alt="" className="avatar2" />
          <h4>
            <Link to={`/profile/${user._id}`}>{user.userName}</Link>
          </h4>
        </div>
        <img src={post.img} alt="" className="post-img" />

        <p>{post.desc}</p>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="التعليقات:" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {comments.length &&
                comments.map((info, i) => {
                  return (
                    <div key={i} className="comment">
                     <div className="userName">
                     <img
                        src={info.userId.avatar}
                        alt=""
                        className="comment-avatar"
                      />
                      <h5>{info.userId.userName}</h5>
                     </div>
                      <h6>{info.date}</h6>
                      <h4>{info.comment}</h4>
                      {state.signIn.id === info.userId._id ||
                      state.signIn.userType === "admin" ? (
                        <CgCloseO onClick={() => deleteComment(info._id)} />
                      ) : (
                        <></>
                      )}

                      
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
          defaultValue={comment}
          placeholder="اكتب تعلقيك هنا"
          onChange={(ev) => setcomment(ev.target.value)}
        ></textarea>
        <button onClick={() => addComment(post._id)} className="comment-bttn">
          اضف تعليق
        </button>
      </Box>

      {/* To open a form For updating post */}
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
            <Button onClick={() => update(post._id)}>تحديث</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Post;
