import { combineReducers } from "redux";
import Groups from "./group";

export const masterReducer = combineReducers({
  group: Groups,
});
