import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./style.css";

const NotApproved = () => {
  useEffect(() => {
    allNonApproved();
  }, []);
  const [approve, setApprove] = useState([]);

  const state = useSelector((state) => {
    return state;
  });

  // Get All Users function
  const allNonApproved = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/notAprove`,

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

  const approved = async () => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/products/approved`,

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
    allNonApproved();
  };

  return (
    <div className="users">
      <h1>Approved</h1>
      {approve.length &&
        approve.map((item) => {
          return (
            <div key={approve[0]._id} className="user-card">
              <img src={item.img} alt="" />
              <h2>{item.name}</h2>
              <button onClick={() => approved(item._id)}>يعتمد</button>
            </div>
          );
        })}
    </div>
  );
};

export default NotApproved;
