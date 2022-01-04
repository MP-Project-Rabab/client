import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
// End of import all dependencies
import "./style.css";
const Post = () => {
  let { id } = useParams();
  useEffect(() => {
    onePost();
  }, []);
  const [comments, setComments] = useState({});
  const [comment, setcomment] = useState("");
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
      setComments(result.data.commentes);
      console.log(result.data.commentes);
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
  console.log(post);
  return (
    <div className="one-post">
      <h1>one post</h1>
      {/* {console.log(post.commentes)} */}
      <img src={post.img} alt="" className="post-img" />
      <h1>{post.title}</h1>
      <p>{post.desc}</p>
      {comments.length &&
        comments.map((info, i) => {
          return <h4 key={i}>{info.comment}</h4>;
        })}
      <input
        type="text"
        name=""
        id=""
        // value={comments.comment}
        onChange={(ev) => setcomment(ev.target.value)}
      />
      <button onClick={() => addComment(post._id)}>اضف تعليق</button>
    </div>
  );
};

export default Post;
