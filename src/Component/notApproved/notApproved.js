import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./style.css";

const NotApproved = () => {
  useEffect(() => {
    allNonApproved();
  }, []);
  const [approve, setApprove] = useState({});

  const state = useSelector((state) => {
    return state;
  });

  // Get All Products Is not Approvedfunction
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
  // Approved All Products function
  const approved = async (id) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/products/approved`,
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
    allNonApproved();
  };

  return (
    <div className="users">
      <h1>Approved</h1>
      {approve.length &&
        approve.map((item) => {
          return (
            <div key={approve._id} className="user-card">
              <img src={item.img} alt="" />
              <h2>{item.name}</h2>
              <h2>{item.title}</h2>
              <button onClick={() => approved(item._id)}>يعتمد</button>
            </div>
          );
        })}
    </div>
  );
};

export default NotApproved;
