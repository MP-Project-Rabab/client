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
import Nav from "./Component/Header/Nav";
import Header from "./Component/Header/Header";
import Products from "./Component/Products/Products";
import Problems from "./Component/Probs&solution/Problems";
import User from "./Component/Account/User/User";
import NotApproved from "./Component/notApproved/notApproved";
import NoApproved from "./Component/Posts/NoApproved";
import Cart from "./Component/Cart/Cart";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forget" element={<Forget />} />
        <Route exact path="/reset-pass/:id" element={<ResetPass />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/tips" element={<Tips />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/problems" element={<Problems />} />
        <Route exact path="/users" element={<User />} />
        <Route exact path="/productsApprove" element={<NotApproved />} />
        <Route exact path="/postsApprove" element={<NoApproved />} />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
      <img src="" alt="" />
    </div>
  );
}

export default App;
