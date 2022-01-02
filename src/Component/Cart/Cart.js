import React,{useEffect} from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getinfo } from "../../reducers/user";
import "./style.css";

const Cart = () => {
    useEffect(() => {
        userInfo();
      }, []);
  const dispatch = useDispatch();
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
      dispatch(getinfo(result.data));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(state);
  return (
    <div>
      <h1>Cart Component</h1>
      {state.userReducer.cart.length &&
        state.userReducer.cart.map((info) => {})}
    </div>
  );
};

export default Cart;
