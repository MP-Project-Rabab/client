import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import signIn from "./login";
import postReducer from "./post";


const reducer = combineReducers({ signIn, postReducer});

const store = () => {
  return createStore(reducer, composeWithDevTools());
};

export default store();
