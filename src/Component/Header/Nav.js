import React from "react";
import { Link } from "react-router-dom";

import "./nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <nav>
        <Link to="/tips">طرق العنايه بالنباتات</Link>
        <Link to="/problems">المشاكل والحلول</Link>
        <Link to="/products">المنتجات</Link>
      </nav>
    </div>
  );
};

export default Nav;
