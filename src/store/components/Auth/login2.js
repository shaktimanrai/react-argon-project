import axios from "../../../shared/axios";
import "react-toastify/dist/ReactToastify.min.css";
import customToast from "Helpers/customToast";

//Action Types
const ADD_LOGIN = "ADD_LOGIN";
const LOGIN_LOADING = "LOGIN_LOADING";
const LOGIN_FAILED = "LOGIN_FAILED";
const REMOVE_LOGIN = "REMOVE_LOGIN";

//Login
export const postLogin = (data, setSubmitting) => (dispatch) => {
  console.log("login data", data);
  dispatch(loginLoading(true));

  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });

  axios
    .post("/login", data, myheader)
    .then((res) => {
      dispatch(addLogin(res.data));
      customToast(
        "success",
        `Login Successful ${res.data.User?.name}`,
        "top-end",
        1500
      );
      // toast.success(`${res.data.User.name}, Welcome!`);
      if (setSubmitting) {
        setSubmitting(false);
      }
    })
    .catch((error) => {
      dispatch(loginFailed(error));
      if (setSubmitting) {
        setSubmitting(false);
      }
    });
};

export const postEmployeeLogin = (data) => (dispatch) => {
  console.log("login data", data);
  dispatch(loginLoading(true));

  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  axios
    .post("/employeelogin", data, myheader)
    .then((res) => {
      dispatch(addLogin(res.data));
      customToast(
        "success",
        `Login Successful ${res.data.Employee?.name}`,
        "top-end",
        1500
      );
    })
    .catch((error) => {
      dispatch(loginFailed(error));
    });
};

export const loginLoading = () => ({
  type: LOGIN_LOADING,
});

export const loginFailed = (errmess) => ({
  type: LOGIN_FAILED,
  payload: errmess,
});

export const addLogin = (login) => ({
  type: ADD_LOGIN,
  payload: login,
});

//Remove
export const removeLogin = () => ({
  type: REMOVE_LOGIN,
  payload: [],
});

export const Login = (
  state = { isLoading: true, errMess: null, login: [] },
  action
) => {
  switch (action.type) {
    case ADD_LOGIN:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        login: action.payload,
      };

    case LOGIN_LOADING:
      return { ...state, isLoading: true, errMess: null };

    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        login: [],
      };

    case REMOVE_LOGIN:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        login: action.payload,
      };

    default:
      return state;
  }
};
