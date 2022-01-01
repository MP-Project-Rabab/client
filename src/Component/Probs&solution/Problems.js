import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPost, newPost, UpdatePost, delPost } from "../../reducers/post";
import {
  TextField,
  Button,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import { BsPatchPlus } from "react-icons/bs";
import FileBase from "react-file-base64";
import { Link } from "react-router-dom";

import "./style.css";

const Problems = () => {
  useEffect(() => {
    allProblems();
  }, []);

  const state = useSelector((state) => {
    return state;
  });
  const [problem, setProblem] = useState({
    img: "",
    desc: "",
    user: state.signIn.id,
    isProblem: true,
    title: "",
  });
  const dispatch = useDispatch();

  // Get All Problems function
  const allProblems = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/problems`,

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
  console.log(state);

  // Add new Problem function
  const newProblem = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts/post`,
        problem,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      dispatch(newPost({ posts: result.data }));
    } catch (error) {
      console.log(error);
    }
    allProblems();
  };
  // update Problem function
  const update = async (id) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/posts/update`,
        {
          title: problem.title,
          _id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );

      dispatch(UpdatePost(result.data));
    } catch (error) {
      console.log(error);
    }
    allProblems();
  };

  // Delete Problem function
  const deleteProblem = async (id) => {
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
    allProblems();
  };

  return (
    <div>
      <h1>Problems Component</h1>
      {state.postReducer.posts.length &&
        state.postReducer.posts.map((info) => {
          return (
            <div key={info._id} className="tips-card">
              <h2>
                <Link to={`/post/${info._id}`}>{info.title}</Link>
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(ev) =>
                    setProblem({ ...problem, title: ev.target.value })
                  }
                />
                <button onClick={() => update(info._id)}>Update</button>
              </h2>
              <h6>بواسطة: {info.user.userName}</h6>
              <button onClick={() => deleteProblem(info._id)}>حذف</button>
            </div>
          );
        })}
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64, base64: string }) =>
          setProblem({ ...problem, img: base64 })
        }
      />
      <TextField
        margin="dense"
        id="name"
        name="name"
        label="عنوان المشكلة:"
        type="text"
        variant="standard"
        // value={product.name}
        onChange={(ev) => setProblem({ ...problem, title: ev.target.value })}
      />

      <TextField
        id="standard-textarea"
        label="اكتب مشكلتك هنا:"
        placeholder="Placeholder"
        multiline
        variant="standard"
        onChange={(ev) => setProblem({ ...problem, desc: ev.target.value })}
      />
      <Button onClick={newProblem}>ADD</Button>
    </div>
  );
};

export default Problems;
