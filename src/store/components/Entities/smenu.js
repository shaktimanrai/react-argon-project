import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: [],
    postMenu: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    menuSetData: (state, action) => {
      state.menu = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    menuFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    menuUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    menuLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    menuPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },

    postMenuDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postMenuDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postMenu = action.payload;
    },
    updateMenuDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateMenuDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postMenu = action.payload;
    },
    uploadMenuFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    uploadMenuSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postMenu = action.payload;
    },
  },
});

export const {
  menuSetData,
  menuFailData,
  menuLoading,
  menuPostLoading,
  menuUpdateLoading,
  postMenuDataFail,
  postMenuDataSuccess,
  updateMenuDataFail,
  updateMenuDataSuccess,
  uploadMenuFail,
  uploadMenuSuccess,
} = menuSlice.actions;

export default menuSlice.reducer;

const url = "https://api.npoint.io/9f1308d2b007990474ae";

export const menuGetData = (data) => async (dispatch) => {
  dispatch(menuLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(menuSetData(response.data));
  } catch (error) {
    dispatch(menuFailData(error.message));
  }
};

export const postMenuData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(menuPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      // dispatch(postMenuDataSuccess(response.data));
      dispatch(menuGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created Menu",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        if (toggle) {
          toggle();
        }
        if (setSubmitting) {
          setSubmitting(false);
        }
      });
    } catch (error) {
      dispatch(postMenuDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateMenuData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(menuUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, user, {
        headers: myheader,
      });

      dispatch(updateMenuDataSuccess(response.data));
      dispatch(menuGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated Menu",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        if (toggle) {
          toggle();
        }
      });
    } catch (error) {
      dispatch(updateMenuDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteMenu = (id, data) => async (dispatch) => {
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.delete(url + `/${id}`, {
      headers: myheader,
    });
    Swal.fire("Deleted!", "Your file has been deleted.", "success").then(() => {
      dispatch(menuGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadMenu =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(menuPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/upload`, user, {
        headers: myheader,
      });
      dispatch(uploadMenuSuccess(response.data));
      dispatch(menuGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Uploaded Menu",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        if (toggle) {
          toggle();
        }
      });
    } catch (error) {
      dispatch(uploadMenuFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };
