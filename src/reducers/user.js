const initialState = {
    user: {},
  };
  
  let userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "ALL_INFO":
           
            return payload;
      default:
        return state;
    }
  };
  
  export default userReducer;
  
  export const getinfo = (data) => {
    return {
      type: "ALL_INFO",
      payload: data,
    };
  };
  
 