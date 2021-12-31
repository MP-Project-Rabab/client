import React from "react";
import { Link } from "react-router-dom";
import { IoStorefrontOutline } from "react-icons/io5";

import "./nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <nav>
        <Link to="/">الرئيسية</Link>
        <Link to="/tips">طرق العنايه بالنباتات</Link>
        <Link to="/problems">المشاكل والحلول</Link>
        <Link to="/products">المتجر <IoStorefrontOutline /></Link>
      </nav>
    </div>
  );
};

export default Nav;
