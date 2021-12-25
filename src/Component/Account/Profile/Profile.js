import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../Header/Nav";
import Header from "../../Header/Header";
// import { logIn } from "../../../reducers/login";
import "./style.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    userProfile();
  }, []);



  const state = useSelector((state) => {
    return state;
  });
  const userProfile = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/profile?_id=${state.signIn.id}`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setUserInfo(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userInfo);
  return (
    <>
    <Header />
      <Nav />
      <img src={userInfo.avatar} alt="" className="avatar" />
      <h1>user name: </h1>
      <h2>{userInfo.userName}</h2>
    </>
  );
};

export default Profile;
