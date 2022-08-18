import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const managemastersSlice = createSlice({
  name: "managemasters",
  initialState: {
    managemasters: [],
    postManageMasters: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    managemastersSetData: (state, action) => {
      state.managemasters = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    managemastersFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    managemastersUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    managemastersLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    managemastersPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },

    postManageMastersDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postManageMastersDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postManageMasters = action.payload;
    },
    updateManageMastersDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateManageMastersDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postManageMasters = action.payload;
    },
    uploadManageMastersFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    uploadManageMastersSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postManageMasters = action.payload;
    },
  },
});

export const {
  managemastersSetData,
  managemastersFailData,
  managemastersLoading,
  managemastersPostLoading,
  managemastersUpdateLoading,
  postManageMastersDataFail,
  postManageMastersDataSuccess,
  updateManageMastersDataFail,
  updateManageMastersDataSuccess,
  uploadManageMastersFail,
  uploadManageMastersSuccess,
} = managemastersSlice.actions;

export default managemastersSlice.reducer;

const url = "https://api.npoint.io/d6783bff0b457634cfdf";

export const managemastersGetData = (data) => async (dispatch) => {
  dispatch(managemastersLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(managemastersSetData(response.data));
  } catch (error) {
    dispatch(managemastersFailData(error.message));
  }
};

export const postManageMastersData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managemastersPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      // dispatch(postManageMastersDataSuccess(response.data));
      dispatch(managemastersGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created ManageMasters",
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
      dispatch(postManageMastersDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateManageMastersData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managemastersUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, user, {
        headers: myheader,
      });

      dispatch(updateManageMastersDataSuccess(response.data));
      dispatch(managemastersGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated ManageMasters",
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
      dispatch(updateManageMastersDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteManageMasters = (id, data) => async (dispatch) => {
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
      dispatch(managemastersGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadManageMasters =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managemastersPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/upload`, user, {
        headers: myheader,
      });
      dispatch(uploadManageMastersSuccess(response.data));
      dispatch(managemastersGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Uploaded ManageMasters",
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
      dispatch(uploadManageMastersFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };
