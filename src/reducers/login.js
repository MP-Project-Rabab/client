const initialState = {
    user: {},
    token: "",
    info: {}
  };
  
  const signIn = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "LOGIN":
        const { user, token } = payload;
        localStorage.setItem("token", token);
        localStorage.setItem("id", user._id);
        localStorage.setItem("userType", user.userType);
        localStorage.setItem("cart", user.cart);
        return { user, token };
      
        case "LOGOUT":
          localStorage.clear();
          return payload;
          default:
            let getToken = localStorage.getItem("token");
            let getId = localStorage.getItem("id");
            let userType = localStorage.getItem("userType");
            let cart = localStorage.getItem("cart");
        
        if (getToken) return { token: getToken, id: getId, userType:userType, cart: cart};
        else return state;
       
    }
  };
  
  export default signIn;
  
  export const logIn = (data) => {
    return {
      type: "LOGIN",
      payload: data,
    };
  };
  
  export const getinfo = (data) => {
    return {
      type: "ALL_INFO",
      payload: data,
    };
  };
  
  export const logOut = (data) => {
    return {
      type: "LOGOUT",
      payload: data,
    };
  };
  