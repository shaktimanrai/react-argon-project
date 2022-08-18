import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";
import { usersGetData } from "./suser";

const rightSlice = createSlice({
  name: "rights",
  initialState: {
    rights: [],
    postRights: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    rightsSetData: (state, action) => {
      state.rights = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    rightsFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    rightsLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    rightsPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    rightsUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postRightsDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postRightsDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postRights = action.payload;
    },
    updateRightsDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateRightsDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postRights = action.payload;
    },
  },
});

export const {
  rightsSetData,
  rightsFailData,
  rightsLoading,
  rightsPostLoading,
  rightsUpdateLoading,
  postRightsDataFail,
  postRightsDataSuccess,
  updateRightsDataFail,
  updateRightsDataSuccess,
} = rightSlice.actions;

export default rightSlice.reducer;

const url = "/rights";

export const rightsGetData = (data) => async (dispatch) => {
  dispatch(rightsLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(rightsSetData(response.data));
  } catch (error) {
    dispatch(rightsFailData(error.message));
  }
};

export const postRightsData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(rightsPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      dispatch(postRightsDataSuccess(response.data));
      dispatch(rightsGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created Rights",
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
      dispatch(postRightsDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateRightsData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(rightsUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, user, {
        headers: myheader,
      });

      dispatch(rightsGetData(data));
      dispatch(updateRightsDataSuccess(response.data));
      dispatch(usersGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated Rights",
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
      dispatch(updateRightsDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteRights = (id, data) => async (dispatch) => {
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
      dispatch(rightsGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};
