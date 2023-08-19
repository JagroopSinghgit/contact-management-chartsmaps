// store.js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import contactReducer from "./reducers";

const store = createStore(contactReducer, applyMiddleware(thunk));

export default store;
