import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./style.css";

const notApproved = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        allNonApproved();
    }, []);
  
    const state = useSelector((state) => {
      return state;
    });
  
    // Get All Users function
    const allNonApproved = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/products`,
  
          {
            headers: {
              Authorization: `Bearer ${state.signIn.token}`,
            },
          }
        );
        setUsers(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    const deleteUser = async (id) => {
      try {
        const result = await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/user/delete?_id=${id}`,
  
          {
            headers: {
              Authorization: `Bearer ${state.signIn.token}`,
            },
          }
        );
        setUsers(result.data);
      } catch (error) {
        console.log(error);
      }
      allUser()
    };
    console.log(users);
    return (
    <div className="users">
        {users.length &&
        users.map((user) => {
          return (
              <div key={user._id} className="user-card">
                <img src={user.avatar} alt="" />
                <h2>{user.userName}</h2>
                <button onClick={() => deleteUser(user._id)}>حذف</button>
              </div>
            );
        })}
    </div>
  
    )
}

export default notApproved
