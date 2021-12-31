import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const NoApproved = () => {
  useEffect(() => {
    postNotApproved();
  }, []);
  const [approve, setApprove] = useState({});

  const state = useSelector((state) => {
    return state;
  });
  //  Get All Posts Is not Approved function
  const postNotApproved = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/notAprove`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setApprove(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Approved All Posts function
  const postApprove = async (id) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/posts/approved`,
        { isApproved: true, _id: id },

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
    postNotApproved();
  };
  return (
    <div>
      <h1>Approved</h1>
      {approve.length &&
        approve.map((item) => {
          return (
            <div key={approve._id} className="user-card">
              <img src={item.img} alt="" />
              <h2>{item.title}</h2>
              <button onClick={() => postApprove(item._id)}>يعتمد</button>
            </div>
          );
        })}
    </div>
  );
};

export default NoApproved;
