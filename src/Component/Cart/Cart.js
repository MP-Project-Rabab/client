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
  Box,
  
} from "@mui/material";
// eslint-disable-next-line
import Item from "./Item";
// End of import all dependencies
import "./style.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState();
  const [order, setOrder] = useState({});
  // const [loading, setLoading] = useState(false)
  useEffect(() => {
    userInfo();
    getOrder();
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

      setCart(result.data.cart);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteItem = async (id) => {
    deleteOrder(id);

    try {
      // eslint-disable-next-line
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/products/cart`,
        { _id: id, user: state.signIn.id },

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    userInfo();
  };

  // handle the order function
  const getOrder = async (id) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/order/all`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setOrder(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  // update order
  const updateOrder = async (id) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/order/update`,
        { orders: id, ...order },

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      // setOrders(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
    getOrder();
  };

  const deleteOrder = async (id) => {
    try {
      // eslint-disable-next-line
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/order/delete?orders=${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const inc = (id) => {
    console.log(order);
    setOrder({ ...order, Quantity: order[0].Quantity + 1 });
    updateOrder(id);
  };
  const dec = () => {
    setQuantity(quantity - 1);
    console.log(quantity);
  };
  return (
    <>
      {cart.length === 0 ? (
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <h2>لا توجد منتجات في سلة المشتريات.</h2>
        </Box>
      ) : (
        <>
          <TableContainer
            component={Paper}
            style={{
              width: "55%",
              padding: "7px",
              margin: "auto",
              marginTop: "12rem",
            }}
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
                      // <Item id={info._id} key={info._id}/>
                      <TableRow
                        key={i}
                        className="cart-card"
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
                          <IconButton onClick={(ev) => inc(info._id)}>
                            <BsPlus />
                          </IconButton>
                          <h5 key={order[0]._id}>{order[0].Quantity}</h5>

                          <IconButton onClick={dec}>
                            <BiMinus />
                          </IconButton>
                        </TableCell>

                        <TableCell align="right">{info.price}</TableCell>
                        <IconButton
                          onClick={() => deleteItem(info._id)}
                          className="delete-icon"
                        >
                          <IoTrashOutline />
                        </IconButton>
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
              style={{ marginRight: "54rem", marginTop: "3rem" }}
            >
              متابعة التسوق
            </Button>
          </Link>
          <Link to="/products" className="check">
            <Button
              variant="outlined"
              color="success"
              style={{ marginRight: "4rem", marginTop: "3rem" }}
            >
              متابعة الدفع
            </Button>
          </Link>
        </>
      )}
    </>
  );
};

export default Cart;
