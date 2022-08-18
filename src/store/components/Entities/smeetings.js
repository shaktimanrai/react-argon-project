import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const meetingsSlice = createSlice({
  name: "meetings",
  initialState: {
    meetings: [],
    postMeetings: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    meetingsSetData: (state, action) => {
      state.meetings = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    meetingsFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    meetingsUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    meetingsLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    meetingsPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },

    postMeetingsDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postMeetingsDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postMeetings = action.payload;
    },
    updateMeetingsDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateMeetingsDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postMeetings = action.payload;
    },
    uploadMeetingsFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    uploadMeetingsSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postMeetings = action.payload;
    },
  },
});

export const {
  meetingsSetData,
  meetingsFailData,
  meetingsLoading,
  meetingsPostLoading,
  meetingsUpdateLoading,
  postMeetingsDataFail,
  postMeetingsDataSuccess,
  updateMeetingsDataFail,
  updateMeetingsDataSuccess,
  uploadMeetingsFail,
  uploadMeetingsSuccess,
} = meetingsSlice.actions;

export default meetingsSlice.reducer;

const url = "https://api.npoint.io/fbb4cbfeab841e212f0c";

export const meetingsGetData = (data) => async (dispatch) => {
  dispatch(meetingsLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(meetingsSetData(response.data));
  } catch (error) {
    dispatch(meetingsFailData(error.message));
  }
};

export const postMeetingsData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(meetingsPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      // dispatch(postMeetingsDataSuccess(response.data));
      dispatch(meetingsGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created Meetings",
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
      dispatch(postMeetingsDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateMeetingsData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(meetingsUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, user, {
        headers: myheader,
      });

      dispatch(updateMeetingsDataSuccess(response.data));
      dispatch(meetingsGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated Meetings",
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
      dispatch(updateMeetingsDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteMeetings = (id, data) => async (dispatch) => {
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
      dispatch(meetingsGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadMeetings =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(meetingsPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/upload`, user, {
        headers: myheader,
      });
      dispatch(uploadMeetingsSuccess(response.data));
      dispatch(meetingsGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Uploaded Meetings",
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
      dispatch(uploadMeetingsFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };
