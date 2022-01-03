import React,{useEffect,useState} from "react";
import axios from "axios";
import { useSelector} from "react-redux";

import "./style.css";

const Cart = () => {
    const [cart, setCart] = useState([])
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
      setCart(result.data.cart)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Cart Component</h1>
      {cart.length &&
        cart.map((info,i) => {
            return (
                <h4 key={i}>{info.name}</h4>
            )
        })}
    </div>
  );
};

export default Cart;
