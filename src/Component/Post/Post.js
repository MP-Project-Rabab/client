import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { useSelector } from "react-redux";

import "./style.css";
const Post = () => {
  let { id } = useParams();
  useEffect(() => {
    onePost();
  }, []);
  const [post, setPost] = useState({});
  const state = useSelector((state) => {
    return state;
  });

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
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div>
      <h1>one post</h1>
   {/* {console.log(post.commentes)} */}
              <img src={post.img} alt="" className="post-img" />
              <h1>{post.title}</h1>
              <p>{post.desc}</p>
              {/* <p>comments: {post.commentes[0].comment}</p> */}
      
    </div>
  );
};

export default Post;
