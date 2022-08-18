import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const managemasterSlice = createSlice({
  name: "managemaster",
  initialState: {
    managemaster: [],
    postManageMaster: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    managemasterSetData: (state, action) => {
      state.managemaster = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    managemasterFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    managemasterUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    managemasterLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    managemasterPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },

    postManageMasterDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postManageMasterDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postManageMaster = action.payload;
    },
    updateManageMasterDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateManageMasterDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postManageMaster = action.payload;
    },
    uploadManageMasterFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    uploadManageMasterSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postManageMaster = action.payload;
    },
  },
});

export const {
  managemasterSetData,
  managemasterFailData,
  managemasterLoading,
  managemasterPostLoading,
  managemasterUpdateLoading,
  postManageMasterDataFail,
  postManageMasterDataSuccess,
  updateManageMasterDataFail,
  updateManageMasterDataSuccess,
  uploadManageMasterFail,
  uploadManageMasterSuccess,
} = managemasterSlice.actions;

export default managemasterSlice.reducer;

const url = "https://api.npoint.io/9f1308d2b007990474ae";

export const managemasterGetData = (data) => async (dispatch) => {
  dispatch(managemasterLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(managemasterSetData(response.data));
  } catch (error) {
    dispatch(managemasterFailData(error.message));
  }
};

export const postManageMasterData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managemasterPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      // dispatch(postManageMasterDataSuccess(response.data));
      dispatch(managemasterGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created ManageMaster",
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
      dispatch(postManageMasterDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateManageMasterData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managemasterUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, user, {
        headers: myheader,
      });

      dispatch(updateManageMasterDataSuccess(response.data));
      dispatch(managemasterGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated ManageMaster",
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
      dispatch(updateManageMasterDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteManageMaster = (id, data) => async (dispatch) => {
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
      dispatch(managemasterGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadManageMaster =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managemasterPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/upload`, user, {
        headers: myheader,
      });
      dispatch(uploadManageMasterSuccess(response.data));
      dispatch(managemasterGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Uploaded ManageMaster",
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
      dispatch(uploadManageMasterFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };
