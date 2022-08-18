import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const managedocumentsSlice = createSlice({
  name: "managedocuments",
  initialState: {
    managedocuments: [],
    postManageDocuments: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    managedocumentsSetData: (state, action) => {
      state.managedocuments = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    managedocumentsFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    managedocumentsUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    managedocumentsLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    managedocumentsPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },

    postManageDocumentsDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postManageDocumentsDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postManageDocuments = action.payload;
    },
    updateManageDocumentsDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateManageDocumentsDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postManageDocuments = action.payload;
    },
    uploadManageDocumentsFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    uploadManageDocumentsSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postManageDocuments = action.payload;
    },
  },
});

export const {
  managedocumentsSetData,
  managedocumentsFailData,
  managedocumentsLoading,
  managedocumentsPostLoading,
  managedocumentsUpdateLoading,
  postManageDocumentsDataFail,
  postManageDocumentsDataSuccess,
  updateManageDocumentsDataFail,
  updateManageDocumentsDataSuccess,
  uploadManageDocumentsFail,
  uploadManageDocumentsSuccess,
} = managedocumentsSlice.actions;

export default managedocumentsSlice.reducer;

const url = "https://api.npoint.io/b2c8ed79a4567013961f";

export const managedocumentsGetData = (data) => async (dispatch) => {
  dispatch(managedocumentsLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(managedocumentsSetData(response.data));
  } catch (error) {
    dispatch(managedocumentsFailData(error.message));
  }
};

export const postManageDocumentsData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managedocumentsPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      // dispatch(postManageDocumentsDataSuccess(response.data));
      dispatch(managedocumentsGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created ManageDocuments",
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
      dispatch(postManageDocumentsDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateManageDocumentsData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managedocumentsUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, user, {
        headers: myheader,
      });

      dispatch(updateManageDocumentsDataSuccess(response.data));
      dispatch(managedocumentsGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated ManageDocuments",
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
      dispatch(updateManageDocumentsDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteManageDocuments = (id, data) => async (dispatch) => {
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
      dispatch(managedocumentsGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadManageDocuments =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managedocumentsPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/upload`, user, {
        headers: myheader,
      });
      dispatch(uploadManageDocumentsSuccess(response.data));
      dispatch(managedocumentsGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Uploaded ManageDocuments",
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
      dispatch(uploadManageDocumentsFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };
