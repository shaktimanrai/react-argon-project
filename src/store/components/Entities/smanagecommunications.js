import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const managecommunicationsSlice = createSlice({
  name: "managecommunications",
  initialState: {
    managecommunications: [],
    postManageCommunications: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    managecommunicationsSetData: (state, action) => {
      state.managecommunications = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    managecommunicationsFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    managecommunicationsUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    managecommunicationsLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    managecommunicationsPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },

    postManageCommunicationsDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postManageCommunicationsDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postManageCommunications = action.payload;
    },
    updateManageCommunicationsDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateManageCommunicationsDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postManageCommunications = action.payload;
    },
    uploadManageCommunicationsFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    uploadManageCommunicationsSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postManageCommunications = action.payload;
    },
  },
});

export const {
  managecommunicationsSetData,
  managecommunicationsFailData,
  managecommunicationsLoading,
  managecommunicationsPostLoading,
  managecommunicationsUpdateLoading,
  postManageCommunicationsDataFail,
  postManageCommunicationsDataSuccess,
  updateManageCommunicationsDataFail,
  updateManageCommunicationsDataSuccess,
  uploadManageCommunicationsFail,
  uploadManageCommunicationsSuccess,
} = managecommunicationsSlice.actions;

export default managecommunicationsSlice.reducer;

const url = "https://api.npoint.io/9f1308d2b007990474ae";

export const managecommunicationsGetData = (data) => async (dispatch) => {
  dispatch(managecommunicationsLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(managecommunicationsSetData(response.data));
  } catch (error) {
    dispatch(managecommunicationsFailData(error.message));
  }
};

export const postManageCommunicationsData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managecommunicationsPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      // dispatch(postManageCommunicationsDataSuccess(response.data));
      dispatch(managecommunicationsGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created ManageCommunications",
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
      dispatch(postManageCommunicationsDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateManageCommunicationsData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managecommunicationsUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, user, {
        headers: myheader,
      });

      dispatch(updateManageCommunicationsDataSuccess(response.data));
      dispatch(managecommunicationsGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated ManageCommunications",
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
      dispatch(updateManageCommunicationsDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteManageCommunications = (id, data) => async (dispatch) => {
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
      dispatch(managecommunicationsGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadManageCommunications =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managecommunicationsPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/upload`, user, {
        headers: myheader,
      });
      dispatch(uploadManageCommunicationsSuccess(response.data));
      dispatch(managecommunicationsGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Uploaded ManageCommunications",
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
      dispatch(uploadManageCommunicationsFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };
