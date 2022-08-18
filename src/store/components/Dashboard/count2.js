import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../shared/axios";

const countSlice = createSlice({
  name: "count",
  initialState: {
    count: [],
    error: false,
    isLoading: false,
  },
  reducers: {
    countSetData: (state, action) => {
      state.count = action.payload;
      state.error = false;
      state.isLoading = false;
    },
    countFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    countLoading: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
  },
});

export const { countSetData, countFailData, countLoading } = countSlice.actions;

export default countSlice.reducer;

const url = "get-count";

export const countGetData = (data) => async (dispatch) => {
  dispatch(countLoading());
  console.log("data", data);
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(countSetData(response.data));
  } catch (error) {
    dispatch(countFailData(error.message));
  }
};
