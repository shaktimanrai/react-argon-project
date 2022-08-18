import { combineReducers } from "redux";
import { Login } from "./login";

export const AuthReducer = combineReducers({
  login: Login,
});
