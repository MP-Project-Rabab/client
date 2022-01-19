import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Register from "./Component/Account/Register/Register";
import Login from "./Component/Account/Login/Login";
import Forget from "./Component/Account/ForgetPass/ForgetPass";
import ResetPass from "./Component/Account/ResetPass/ResetPass";
import Profile from "./Component/Account/Profile/Profile";
import Tips from "./Component/Tips/Tips";
import "./App.css";
import Header from "./Component/Header/Header";
import Products from "./Component/Products/Products";
import Problems from "./Component/Probs&solution/Problems";
import Cart from "./Component/Cart/Cart";
import f1 from "./img/f1.png";
import Post from "./Component/Post/Post";
import Dashboard from "./Component/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Nav /> */}
      {/* {user ? return <Navigate to="/" replace /> : <Login />} */}
      
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forget" element={<Forget />} />
        <Route exact path="/reset-pass/:id" element={<ResetPass />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/tips" element={<Tips />} />
        <Route exact path="/store" element={<Products />} />
        <Route exact path="/problems" element={<Problems />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/post/:id" element={<Post />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
      <img src={f1} alt="" className="leaf" />
    </div>
  );
}

export default App;
