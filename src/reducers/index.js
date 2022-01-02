import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import signIn from "./login";
import postReducer from "./post";
import productsReducer from "./products";
import userReducer from "./user";


const reducer = combineReducers({ signIn, postReducer, productsReducer, userReducer});

const store = () => {
  return createStore(reducer, composeWithDevTools());
};

export default store();
