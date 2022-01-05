import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import {
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
// End of import all dependencies
import "./style.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(1);
  useEffect(() => {
    userInfo();
  }, []);
  const state = useSelector((state) => {
    return state;
  });

  const userInfo = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/profile?_id=${state.signIn.id}`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );

      console.log(result.data.cart);
      setCart(result.data.cart);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteItem = async (id) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/products/cart`,
        { _id: id, user: state.signIn.id },

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );

      console.log(result.data.cart);
      // setCart(result.data.cart)
    } catch (error) {
      console.log(error);
    }
    userInfo();
  };
  const inc = (ev) => {
    setQuantity(quantity + 1);
    console.log(quantity);
  };
  const dec = () => {
    setQuantity(quantity - 1);
    console.log(quantity);
  };
  return (
    <>
      <TableContainer
        component={Paper}
        style={{ width: "55%", padding: "7px", margin: "auto", marginTop: "12rem" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">المنتج</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">السعر</TableCell>
              <TableCell align="right">الكمية</TableCell>
              <TableCell align="right">المجموع</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.length &&
              cart.map((info, i) => {
                return (
                  <TableRow
                    key={i}
                    className="cart-card"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="right">
                      <img src={info.img} alt="" />
                    </TableCell>
                    <TableCell align="right">
                      <h3>{info.name}</h3>
                    </TableCell>
                    <TableCell align="right">
                      <h4> {info.price} ر.س</h4>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={(ev) => inc(ev.target.value)}>
                        <BsPlus />
                      </IconButton>
                      {quantity}
                      <IconButton onClick={dec}>
                        <BiMinus />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">{total}</TableCell>
                    <IoTrashOutline
                      onClick={() => deleteItem(info._id)}
                      className="delete-icon"
                    />
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/products" className="continue">
        <Button
          variant="outlined"
          color="success"
          style={{ marginRight: "64rem", marginTop: "3rem" }}
        >
          متابعة التسوق
        </Button>
      </Link>
    </>
  );
};

export default Cart;
