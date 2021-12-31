import React, { useEffect} from "react";
import {  useParams  } from "react-router-dom";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getPost, newPost, UpdatePost, delPost } from "../../reducers/post";

import "./style.css";
const Post = () => {
  let { id } = useParams();
  useEffect(() => {
    onePost();
  }, []);
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
 
  const onePost = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/postBy?_id=${id}`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      dispatch(getPost(result.data));
    //   console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(state.postReducer);
  return (
    <div>
      <h1>one post</h1>
      <img src={state.postReducer.img} alt="" />
      <h1>{state.postReducer.title}</h1>
      <p>{state.postReducer.desc}</p>
    </div>
  );
};

export default Post;
