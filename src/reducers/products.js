const initialState = {
  products: {},
};

let productsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ALL_Products":
      return payload;

    case "NEW_Products":
      const { products } = payload;
      return { ...state, products };

    case "DELETE_Products":
      const { deleProduct } = payload;
      return {
        products: state.products.filter((el) => el._id !== deleProduct),
      };

    case "UPDATE_Products":
      const { updProduct } = payload;
      return { products: state.products.map((el) => el._id == updProduct) };

    default:
      return state;
  }
};

export default productsReducer;

export const getProducts = (data) => {
  return {
    type: "ALL_Products",
    payload: data,
  };
};

export const newProducts = (data) => {
  return {
    type: "NEW_Products",
    payload: data,
  };
};

export const delProducts = (data) => {
  return {
    type: "DELETE_Products",
    payload: { deletepost: data._id },
  };
};

export const UpdateProducts = (data) => {
  return {
    type: "UPDATE_Products",
    payload: { Updpost: data._id },
  };
};
