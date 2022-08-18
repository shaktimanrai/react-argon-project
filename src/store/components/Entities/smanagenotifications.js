import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const managenotificationsSlice = createSlice({
  name: "managenotifications",
  initialState: {
    managenotifications: [],
    postManageNotifications: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    managenotificationsSetData: (state, action) => {
      state.managenotifications = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    managenotificationsFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    managenotificationsUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    managenotificationsLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    managenotificationsPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },

    postManageNotificationsDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postManageNotificationsDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postManageNotifications = action.payload;
    },
    updateManageNotificationsDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateManageNotificationsDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postManageNotifications = action.payload;
    },
    uploadManageNotificationsFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    uploadManageNotificationsSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postManageNotifications = action.payload;
    },
  },
});

export const {
  managenotificationsSetData,
  managenotificationsFailData,
  managenotificationsLoading,
  managenotificationsPostLoading,
  managenotificationsUpdateLoading,
  postManageNotificationsDataFail,
  postManageNotificationsDataSuccess,
  updateManageNotificationsDataFail,
  updateManageNotificationsDataSuccess,
  uploadManageNotificationsFail,
  uploadManageNotificationsSuccess,
} = managenotificationsSlice.actions;

export default managenotificationsSlice.reducer;

const url = "https://api.npoint.io/d4056cd692e34c9e6aa9";

export const managenotificationsGetData = (data) => async (dispatch) => {
  dispatch(managenotificationsLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(managenotificationsSetData(response.data));
  } catch (error) {
    dispatch(managenotificationsFailData(error.message));
  }
};

export const postManageNotificationsData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managenotificationsPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      // dispatch(postManageNotificationsDataSuccess(response.data));
      dispatch(managenotificationsGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created ManageNotifications",
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
      dispatch(postManageNotificationsDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateManageNotificationsData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managenotificationsUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, user, {
        headers: myheader,
      });

      dispatch(updateManageNotificationsDataSuccess(response.data));
      dispatch(managenotificationsGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated ManageNotifications",
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
      dispatch(updateManageNotificationsDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteManageNotifications = (id, data) => async (dispatch) => {
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
      dispatch(managenotificationsGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadManageNotifications =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managenotificationsPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/upload`, user, {
        headers: myheader,
      });
      dispatch(uploadManageNotificationsSuccess(response.data));
      dispatch(managenotificationsGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Uploaded ManageNotifications",
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
      dispatch(uploadManageNotificationsFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };
