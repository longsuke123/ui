import { combineReducers } from "redux";
import authReducer from "./Auth/reducer";
import bookReducer from "./Book/reducer";

const reducer = () =>
  combineReducers({
    authReducer,
    bookReducer,
  });

export default reducer;
