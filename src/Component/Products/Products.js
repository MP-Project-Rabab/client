import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  newProducts,
  UpdateProducts,
  delProducts,
} from "../../reducers/products";

import "./style.css";
const Products = () => {
  useEffect(() => {
    allProducts();
  }, []);
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  // Get All Products function
  const allProducts = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/all`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      const data = {
        products: result.data,
      };
      dispatch(getProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(state);
  return (
    <div className="products">
      <h1>Products Component</h1>
      {state.productsReducer.products.length &&
        state.productsReducer.products.map((info) => {
          return (
            <div key={info._id} className="products-card">
              <img src={info.img} alt="" />
              <h2>{info.name}</h2>
              <h4>{info.price}</h4>
              <button>اضف للسله</button>
            </div>
          );
        })}
    </div>
  );
};

export default Products;
