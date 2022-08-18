import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";

const groupSlice = createSlice({
  name: "group",
  initialState: {
    group: [],
    postGroup: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    groupSetData: (state, action) => {
      state.group = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    groupFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    groupUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    groupLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    groupPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },

    postGroupDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postGroupDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postGroup = action.payload;
    },
    updateGroupDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateGroupDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postGroup = action.payload;
    },
    uploadGroupFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    uploadGroupSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postGroup = action.payload;
    },
  },
});

export const {
  groupSetData,
  groupFailData,
  groupLoading,
  groupPostLoading,
  groupUpdateLoading,
  postGroupDataFail,
  postGroupDataSuccess,
  updateGroupDataFail,
  updateGroupDataSuccess,
  uploadGroupFail,
  uploadGroupSuccess,
} = groupSlice.actions;

export default groupSlice.reducer;

const url = "groups";

export const groupGetData = (data) => async (dispatch) => {
  dispatch(groupLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(groupSetData(response.data));
  } catch (error) {
    dispatch(groupFailData(error.message));
  }
};

export const postGroupData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(groupPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      // dispatch(postGroupDataSuccess(response.data));
      dispatch(groupGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created Group",
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
      dispatch(postGroupDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateGroupData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(groupUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, user, {
        headers: myheader,
      });

      dispatch(updateGroupDataSuccess(response.data));
      dispatch(groupGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated Group",
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
      dispatch(updateGroupDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteGroup = (id, data) => async (dispatch) => {
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
      dispatch(groupGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadGroup =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(groupPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/upload`, user, {
        headers: myheader,
      });
      dispatch(uploadGroupSuccess(response.data));
      dispatch(groupGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Uploaded Group",
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
      dispatch(uploadGroupFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };
