import { combineReducers } from "redux";

import Login from "../components/Auth/login";
import { BpoGraph, GBQGraph } from "../components/Dashboard/graph";
import { DashboardReducer } from "../components/Dashboard/CRDashboard";
import { EntitiesReducer } from "./../components/Entities/CREntities";

export const rootReducer = combineReducers({
  login: Login,
  dashboard: DashboardReducer,
  bpoGraph: BpoGraph,
  GBQGraph: GBQGraph,
  entities: EntitiesReducer,
});
