import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const sideSlice = createSlice({
  name: "side",
  initialState: {
    side: [],
    postSide: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    sideSetData: (state, action) => {
      state.side = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    sideFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    sideUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    sideLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    sidePostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },

    postSideDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postSideDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postSide = action.payload;
    },
    updateSideDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateSideDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postSide = action.payload;
    },
    uploadSideFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    uploadSideSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postSide = action.payload;
    },
  },
});

export const {
  sideSetData,
  sideFailData,
  sideLoading,
  sidePostLoading,
  sideUpdateLoading,
  postSideDataFail,
  postSideDataSuccess,
  updateSideDataFail,
  updateSideDataSuccess,
  uploadSideFail,
  uploadSideSuccess,
} = sideSlice.actions;

export default sideSlice.reducer;

const url = "https://api.npoint.io/9f1308d2b007990474ae";

export const sideGetData = (data) => async (dispatch) => {
  dispatch(sideLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(sideSetData(response.data));
  } catch (error) {
    dispatch(sideFailData(error.message));
  }
};

export const postSideData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(sidePostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      // dispatch(postSideDataSuccess(response.data));
      dispatch(sideGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created Side",
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
      dispatch(postSideDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateSideData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(sideUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, user, {
        headers: myheader,
      });

      dispatch(updateSideDataSuccess(response.data));
      dispatch(sideGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated Side",
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
      dispatch(updateSideDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteSide = (id, data) => async (dispatch) => {
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
      dispatch(sideGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadSide =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(sidePostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/upload`, user, {
        headers: myheader,
      });
      dispatch(uploadSideSuccess(response.data));
      dispatch(sideGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Uploaded Side",
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
      dispatch(uploadSideFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };
