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

import "./style.css";
const Products = () => {
  useEffect(() => {
    allProducts();
  }, []);
  const state = useSelector((state) => {
    return state;
  });

  const [open, setOpen] = useState(false);
  const [rates, setRates] = useState({
    rate: 0,
    productId: "",
    byUser: state.signIn.id,
   
  });
  const [product, setProduct] = useState({
    seller: state.signIn.id,
    img: "",
    name: "",
    price: 0,
    Quantity: 0,
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
  // delete Product function
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

  // Add New Products function
  const addRate = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/rates/add`,
        rates,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setRates(result.data)
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
    allProducts();
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
  console.log(state);
  return (
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
                onChange={(ev) => setRates({ ...rates, rate: ev.target.defaultValue })}
              />
              <h2>{info.name}</h2>
              <h5>متوفر:{info.Quantity} </h5>
              <h4>{info.price} ر.س</h4>
              <button className="bttn">
              <BsCartPlusFill />
              اضف للسله
              </button>
            </div>
          );
        })}
      <BsPatchPlus className="add" onClick={handleClickOpen} />
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
    </div>
  );
};

export default Products;
