import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPost, newPost, UpdatePost, delPost } from "../../reducers/post";
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
                {info.title}
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(ev) => setProblem({ ...problem, title: ev.target.value })}
                />
                <button onClick={() => update(info._id)}>Update</button>
              </h2>
              <h6>بواسطة:</h6>
              <button onClick={() => deleteProblem(info._id)}>حذف</button>
            </div>
          );
        })}
      <input
        type="text"
        name=""
        id=""
        onChange={(ev) => setProblem({ ...problem, title: ev.target.value })}
      />
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        onChange={(ev) => setProblem({ ...problem, desc: ev.target.value })}
      ></textarea>
      <button onClick={newProblem}>Add</button>
    </div>
  );
};

export default Problems;
