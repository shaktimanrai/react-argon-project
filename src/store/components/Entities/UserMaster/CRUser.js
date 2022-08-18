import { combineReducers } from "redux";
import Users from "./suser";
import Rights from "./srights";

export const userMasterReducer = combineReducers({
  users: Users,
  rights: Rights,
});
