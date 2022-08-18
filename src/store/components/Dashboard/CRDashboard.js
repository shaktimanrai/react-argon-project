import { combineReducers } from "redux";
import Count from "./count2";

export const DashboardReducer = combineReducers({
  count: Count,
});
