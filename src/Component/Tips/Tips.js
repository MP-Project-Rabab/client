import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPost, newPost, UpdatePost, delPost } from "../../reducers/post";
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
  console.log(state);

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
    } catch (error) {
      console.log(error);
    }
    allTip();
  };
  // update Tip function
  const update = async (id) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/posts/update`,
        {
            title: tip.title,
            _id: id
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
    allTip();
  };

// Delete Tip function
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

  return (
    <div className="tips">
      <h1>Tips Component</h1>
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
                  onChange={(ev) => setTip({ ...tip, title: ev.target.value })}
                />
                <button onClick={() => update(info._id)}>Update</button>
              </h2>
              <h6>بواسطة:</h6>
              <button onClick={() => deleteTip(info._id)}>حذف</button>
            </div>
          );
        })}
      <input
        type="text"
        name=""
        id=""
        onChange={(ev) => setTip({ ...tip, title: ev.target.value })}
      />
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        onChange={(ev) => setTip({ ...tip, desc: ev.target.value })}
      ></textarea>
      <button onClick={newTip}>Add</button>
    </div>
  );
};

export default Tips;
