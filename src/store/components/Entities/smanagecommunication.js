import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const managecommunicationSlice = createSlice({
  name: "managecommunication",
  initialState: {
    managecommunication: [],
    postManageCommunication: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    managecommunicationSetData: (state, action) => {
      state.managecommunication = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    managecommunicationFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    managecommunicationUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    managecommunicationLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    managecommunicationPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },

    postManageCommunicationDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postManageCommunicationDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postManageCommunication = action.payload;
    },
    updateManageCommunicationDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateManageCommunicationDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postManageCommunication = action.payload;
    },
    uploadManageCommunicationFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    uploadManageCommunicationSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postManageCommunication = action.payload;
    },
  },
});

export const {
  managecommunicationSetData,
  managecommunicationFailData,
  managecommunicationLoading,
  managecommunicationPostLoading,
  managecommunicationUpdateLoading,
  postManageCommunicationDataFail,
  postManageCommunicationDataSuccess,
  updateManageCommunicationDataFail,
  updateManageCommunicationDataSuccess,
  uploadManageCommunicationFail,
  uploadManageCommunicationSuccess,
} = managecommunicationSlice.actions;

export default managecommunicationSlice.reducer;

const url = "https://api.npoint.io/aa242258a388da0613d5";

export const managecommunicationGetData = (data) => async (dispatch) => {
  dispatch(managecommunicationLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(managecommunicationSetData(response.data));
  } catch (error) {
    dispatch(managecommunicationFailData(error.message));
  }
};

export const postManageCommunicationData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managecommunicationPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      // dispatch(postManageCommunicationDataSuccess(response.data));
      dispatch(managecommunicationGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created ManageCommunication",
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
      dispatch(postManageCommunicationDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateManageCommunicationData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managecommunicationUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, user, {
        headers: myheader,
      });

      dispatch(updateManageCommunicationDataSuccess(response.data));
      dispatch(managecommunicationGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated ManageCommunication",
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
      dispatch(updateManageCommunicationDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteManageCommunication = (id, data) => async (dispatch) => {
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
      dispatch(managecommunicationGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadManageCommunication =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managecommunicationPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/upload`, user, {
        headers: myheader,
      });
      dispatch(uploadManageCommunicationSuccess(response.data));
      dispatch(managecommunicationGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Uploaded ManageCommunication",
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
      dispatch(uploadManageCommunicationFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };
