import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const propertiesSlice = createSlice({
  name: "properties",
  initialState: {
    properties: [],
    postProperties: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    propertiesSetData: (state, action) => {
      state.properties = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    propertiesFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    propertiesUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    propertiesLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    propertiesPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },

    postPropertiesDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postPropertiesDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postProperties = action.payload;
    },
    updatePropertiesDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updatePropertiesDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postProperties = action.payload;
    },
    uploadPropertiesFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    uploadPropertiesSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postProperties = action.payload;
    },
  },
});

export const {
  propertiesSetData,
  propertiesFailData,
  propertiesLoading,
  propertiesPostLoading,
  propertiesUpdateLoading,
  postPropertiesDataFail,
  postPropertiesDataSuccess,
  updatePropertiesDataFail,
  updatePropertiesDataSuccess,
  uploadPropertiesFail,
  uploadPropertiesSuccess,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;

const url = "https://api.npoint.io/9f1308d2b007990474ae";

export const propertiesGetData = (data) => async (dispatch) => {
  dispatch(propertiesLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(propertiesSetData(response.data));
  } catch (error) {
    dispatch(propertiesFailData(error.message));
  }
};

export const postPropertiesData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(propertiesPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      // dispatch(postPropertiesDataSuccess(response.data));
      dispatch(propertiesGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created Properties",
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
      dispatch(postPropertiesDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updatePropertiesData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(propertiesUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, user, {
        headers: myheader,
      });

      dispatch(updatePropertiesDataSuccess(response.data));
      dispatch(propertiesGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated Properties",
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
      dispatch(updatePropertiesDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteProperties = (id, data) => async (dispatch) => {
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
      dispatch(propertiesGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadProperties =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(propertiesPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/upload`, user, {
        headers: myheader,
      });
      dispatch(uploadPropertiesSuccess(response.data));
      dispatch(propertiesGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Uploaded Properties",
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
      dispatch(uploadPropertiesFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };
