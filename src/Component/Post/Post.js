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
  const [comment, setComment] = useState("");
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

  // Editing Comment
  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line 
  const editingInput = (id) => {
    setIsEditing(id);
  };
  const [text, setText] = useState(comment);
  // End

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
      setComment(result.data.commentes.comment);
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

      setComment(result.data);
      setComment("");
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
      setComment(result.data);
    } catch (error) {
      console.log(error);
    }
    onePost();
  };
  // update comment function

  const updateComment = async (id) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/comments/update?_id=${id}&comment=${text}`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setComment(result.data);
      console.log(result.data);
      setIsEditing(false);
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

  let date = comments.date
  console.log(date);
  // countdown date
  // const countdownD = new Date ();
  // Get current date 
  // const nowDate = new Date();
  // const distance = countdownD - nowDate;
  // const days = Math.floor(distance / (1000 * 60 * 60 * 24));

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
                <h5>{comments.length}</h5>
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
                        <h6>{info.date}</h6>
                      </div>
                      {/* Editing Comment */}
                      {isEditing ? (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <TextField
                            multiline
                            variant="standard"
                            defaultValue={info.comment}
                            onChange={(e) => setText(e.target.value)}
                          />
                          <Button
                            size="small"
                            onClick={() => setIsEditing(false)}
                          >
                            تراجع
                          </Button>
                          <Button
                            size="small"
                            onClick={() => updateComment(info._id)}
                          >
                            حفظ
                          </Button>
                        </div>
                      ) : (
                        <h4>
                          {info.comment}
                          {state.signIn.id === info.userId._id ||
                          state.signIn.userType === "admin" ? (
                            <>
                              <Button
                                variant="outlined"
                                color="error"
                                sx={{ marginRight: "1rem" }}
                                // className="delete-btn"
                                onClick={() => deleteComment(info._id)}
                              >
                                حذف
                              </Button>
                              <Button
                                variant="outlined"
                                sx={{ marginRight: "1rem" }}
                                // className="edit-btn"
                                onClick={(e) => {
                                  setIsEditing(true);
                                  console.log(info._id);
                                }}
                                // onClick={() => updateComment(info._id)}
                              >
                                تعديل
                              </Button>
                            </>
                          ) : (
                            <></>
                          )}
                        </h4>
                      )}
                    </div>
                  );
                })}
            </TabPanel>
          </TabContext>
        </Box>
        {state.signIn.id ? (
          <>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="textarea"
              defaultValue={comment}
              placeholder="اكتب تعلقيك هنا"
              onChange={(ev) => setComment(ev.target.value)}
            ></textarea>
            <button
              onClick={() => addComment(post._id)}
              className="comment-bttn"
            >
              اضف تعليق
            </button>
          </>
        ) : (
          <>
            <h3 style={{color: "green"}}>
             لإضافة تعليق يجب عليك تسجيل
              <Link to="/login" className="register" style={{color: "white"}}>
                الدخول
              </Link>
            </h3>
          </>
        )}
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
            fullWidth
            margin="dense"
            id="name"
            name="name"
            label="العنوان:"
            type="text"
            variant="standard"
            onChange={(ev) => setPost({ ...post, title: ev.target.value })}
          />

          <TextField
            fullWidth
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
