import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  newProducts,
  UpdateProducts,
  delProducts,
} from "../../reducers/products";
import {
  TextField,
  Button,
  DialogContent,
  DialogActions,
  Dialog,
  Rating,
} from "@mui/material";
import { BsPatchPlus, BsCartPlusFill } from "react-icons/bs";
import FileBase from "react-file-base64";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
// End of import all dependencies
import f3 from '../../img/f3.jpg'
import g5 from '../../img/g5.jpg'
import f2 from '../../img/f2.jpg'

import "./style.css";
///////////////////////////
const Products = () => {
  useEffect(() => {
    allProducts();
  }, []);
  const state = useSelector((state) => {
    return state;
  });
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState();
  const [rates, setRates] = useState({
    rate: 0,
    productId: "",
    byUser: "",
  });
  const [product, setProduct] = useState({
    seller: state.signIn.id,
    img: "",
    name: "",
    price: 0,
    Quantity: 0,
  });
const dispatch = useDispatch();
// Swipe image handle
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const MyComponent = () => (
  <AutoPlaySwipeableViews className="Swipe">
    <img src={f3} alt="" className="b1"/>
    <img src={g5} alt="" className="b2"/>
    <img src={f2} alt="" className="b3"/>
   
    
  </AutoPlaySwipeableViews>
);

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
  // Add New Products function
  const addProducts = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/products/add`,
        product,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      dispatch(newProducts({ products: result.data }));
    } catch (error) {
      console.log(error);
    }
    allProducts();
  };
  // update Product function
  const updateProducts = async () => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/products/update`,
        product,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      dispatch(UpdateProducts({ products: result.data }));
    } catch (error) {
      console.log(error);
    }
    allProducts();
  };
  // delete Product function
  const deleteProducts = async () => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/products/delete`,
        product,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      dispatch(delProducts({ products: result.data }));
    } catch (error) {
      console.log(error);
    }
    allProducts();
  };

  // Add rate to product function
  const addRate = async (id) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/rates/add`,
        {
          rate: 0,
          productId: id,
          byUser: state.signIn.id,
        },

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setRates(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
    allProducts();
  };
  const addToCart = async (id) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/products/one`,
        { _id: id, user: state.signIn.id },

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setCart(result.data);
      {result.status == 200? (setMsg("تم إضافته للسله")) : 
      (setMsg("لم تتم اضافته للسله") )}
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddProduct = () => {
    addProducts();
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
 
  return (
    <>
      {MyComponent()}
    <div className="products">
      {state.productsReducer.products.length &&
        state.productsReducer.products.map((info) => {
          return (
            <div key={info._id} className="products-card">
              <img src={info.img} alt="" />
              <Rating
                name="half-rating"
                defaultValue={0}
                precision={0.5}
                className="rate"
                onClick={() => addRate(info._id)}
                onChange={(ev) =>
                  setRates({ ...rates, rate: ev.target.defaultValue })
                }
              />
              <h2>{info.name}</h2>
              <h5>متوفر:{info.Quantity} </h5>
              <h4>{info.price} ر.س</h4>
              <button className="bttn" onClick={() => addToCart(info._id)}>
                <BsCartPlusFill />
                اضف للسله
              </button>
            </div>
          );
        })}
      {state.userType == "seller" ? (
        <BsPatchPlus className="add" onClick={handleClickOpen} />
      ) : (
        <></>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <FileBase
            type="file"
            label="اضف صورة"
            multiple={false}
            onDone={({ base64, base64: string }) =>
              setProduct({ ...product, img: base64 })
            }
          />
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="اسم النتج"
            type="text"
            fullWidth
            variant="standard"
            value={product.name}
            onChange={(ev) => setProduct({ ...product, name: ev.target.value })}
          />
          <TextField
            id="standard-number"
            label="اضف السعر"
            type="number"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            onChange={(ev) =>
              setProduct({ ...product, price: ev.target.value })
            }
          />
          <TextField
            id="standard-number"
            label="اضف الكميه"
            type="number"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            onChange={(ev) =>
              setProduct({ ...product, Quantity: ev.target.value })
            }
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddProduct}>ADD</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <h1>{msg}</h1>
    </div>
    </>
  );
};

export default Products;
