import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Register from "./Component/Account/Register/Register";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
         {/* <Route exact path="/login" element={<Login />} /> */}
        {/* <Route exact path="/posts" element={<Post />} /> */}
        {/* <Route exact path="/profile" element={<Profile />} /> */}
        {/* <Route exact path="/activate/" element={<Activate />} /> */}
        {/* <Route exact path="/forget" element={<Forget />} /> */}
        {/* <Route exact path="/reset-pass/:id" element={<ResetPass />} />  */}
      </Routes>
    </div>
  );
}

export default App;
