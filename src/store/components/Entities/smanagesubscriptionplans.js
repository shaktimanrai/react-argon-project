import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const managesubscriptionplansSlice = createSlice({
  name: "managesubscriptionplans",
  initialState: {
    managesubscriptionplans: [],
    postManageSubscriptionPlans: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    managesubscriptionplansSetData: (state, action) => {
      state.managesubscriptionplans = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    managesubscriptionplansFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    managesubscriptionplansUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    managesubscriptionplansLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    managesubscriptionplansPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },

    postManageSubscriptionPlansDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postManageSubscriptionPlansDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postManageSubscriptionPlans = action.payload;
    },
    updateManageSubscriptionPlansDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateManageSubscriptionPlansDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postManageSubscriptionPlans = action.payload;
    },
    uploadManageSubscriptionPlansFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    uploadManageSubscriptionPlansSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postManageSubscriptionPlans = action.payload;
    },
  },
});

export const {
  managesubscriptionplansSetData,
  managesubscriptionplansFailData,
  managesubscriptionplansLoading,
  managesubscriptionplansPostLoading,
  managesubscriptionplansUpdateLoading,
  postManageSubscriptionPlansDataFail,
  postManageSubscriptionPlansDataSuccess,
  updateManageSubscriptionPlansDataFail,
  updateManageSubscriptionPlansDataSuccess,
  uploadManageSubscriptionPlansFail,
  uploadManageSubscriptionPlansSuccess,
} = managesubscriptionplansSlice.actions;

export default managesubscriptionplansSlice.reducer;

const url = "https://api.npoint.io/d6783bff0b457634cfdf";

export const managesubscriptionplansGetData = (data) => async (dispatch) => {
  dispatch(managesubscriptionplansLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(managesubscriptionplansSetData(response.data));
  } catch (error) {
    dispatch(managesubscriptionplansFailData(error.message));
  }
};

export const postManageSubscriptionPlansData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managesubscriptionplansPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      // dispatch(postManageSubscriptionPlansDataSuccess(response.data));
      dispatch(managesubscriptionplansGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created ManageSubscriptionPlans",
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
      dispatch(postManageSubscriptionPlansDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateManageSubscriptionPlansData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managesubscriptionplansUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, user, {
        headers: myheader,
      });

      dispatch(updateManageSubscriptionPlansDataSuccess(response.data));
      dispatch(managesubscriptionplansGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated ManageSubscriptionPlans",
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
      dispatch(updateManageSubscriptionPlansDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteManageSubscriptionPlans = (id, data) => async (dispatch) => {
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
      dispatch(managesubscriptionplansGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadManageSubscriptionPlans =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managesubscriptionplansPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/upload`, user, {
        headers: myheader,
      });
      dispatch(uploadManageSubscriptionPlansSuccess(response.data));
      dispatch(managesubscriptionplansGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Uploaded ManageSubscriptionPlans",
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
      dispatch(uploadManageSubscriptionPlansFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };
