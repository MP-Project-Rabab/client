const initialState = {
    user: {},
    token: "",
  };
  
  const signIn = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "LOGIN":
        const { user, token } = payload;
        localStorage.setItem("token", token);
        localStorage.setItem("id", user._id);
      console.log(token);
        return { user, token };
      case "LOGOUT":
        localStorage.clear();
        return payload;
      default:
        let getToken = localStorage.getItem("token");
        let getId = localStorage.getItem("id");
        if (getToken) return { token: getToken, id: getId, };
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
  
  export const logOut = (data) => {
    return {
      type: "LOGOUT",
      payload: data,
    };
  };
  