import axios from "../../../shared/axios";
import { baseUrl } from "../../../shared/baseURL";

// actionTypes

const COUNT_SET_DATA = "COUNT_SET_DATA";
const COUNT_FAIL_DATA = "COUNT_FAIL_DATA";
const COUNT_LOADING = "COUNT_LOADING";

// actionCreators

export const countSetData = (count) => {
  return {
    type: COUNT_SET_DATA,
    count: count,
  };
};

export const countFailData = (error) => {
  return {
    type: COUNT_FAIL_DATA,
    error: error,
  };
};

export const countLoading = () => {
  return {
    type: COUNT_LOADING,
  };
};

export const countGetData = (data) => {
  return (dispatch) => {
    dispatch(countLoading());
    axios
      .get(baseUrl + "get-count", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(countSetData(res.data));
      })

      .catch((error) => dispatch(countFailData(error)));
  };
};

const initialState = {
  count: [],
  error: false,
  isLoading: false,
};

export const Count = (state = initialState, action) => {
  switch (action.type) {
    case COUNT_SET_DATA:
      return {
        ...state,
        count: action.count,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case COUNT_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case COUNT_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    default:
      return state;
  }
};
