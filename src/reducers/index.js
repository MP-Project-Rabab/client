import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import signIn from "./login";
import postReducer from "./post";
import productsReducer from "./products";



const reducer = combineReducers({ signIn, postReducer, productsReducer});

const store = () => {
  return createStore(reducer, composeWithDevTools());
};

export default store();
