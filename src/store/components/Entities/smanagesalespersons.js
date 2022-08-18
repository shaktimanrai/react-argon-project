import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const managesalespersonsSlice = createSlice({
  name: "managesalespersons",
  initialState: {
    managesalespersons: [],
    postManageSalesPersons: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    managesalespersonsSetData: (state, action) => {
      state.managesalespersons = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    managesalespersonsFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    managesalespersonsUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    managesalespersonsLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    managesalespersonsPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },

    postManageSalesPersonsDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postManageSalesPersonsDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postManageSalesPersons = action.payload;
    },
    updateManageSalesPersonsDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateManageSalesPersonsDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postManageSalesPersons = action.payload;
    },
    uploadManageSalesPersonsFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    uploadManageSalesPersonsSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postManageSalesPersons = action.payload;
    },
  },
});

export const {
  managesalespersonsSetData,
  managesalespersonsFailData,
  managesalespersonsLoading,
  managesalespersonsPostLoading,
  managesalespersonsUpdateLoading,
  postManageSalesPersonsDataFail,
  postManageSalesPersonsDataSuccess,
  updateManageSalesPersonsDataFail,
  updateManageSalesPersonsDataSuccess,
  uploadManageSalesPersonsFail,
  uploadManageSalesPersonsSuccess,
} = managesalespersonsSlice.actions;

export default managesalespersonsSlice.reducer;

const url = "https://api.npoint.io/d6783bff0b457634cfdf";

export const managesalespersonsGetData = (data) => async (dispatch) => {
  dispatch(managesalespersonsLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(managesalespersonsSetData(response.data));
  } catch (error) {
    dispatch(managesalespersonsFailData(error.message));
  }
};

export const postManageSalesPersonsData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managesalespersonsPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      // dispatch(postManageSalesPersonsDataSuccess(response.data));
      dispatch(managesalespersonsGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created ManageSalesPersons",
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
      dispatch(postManageSalesPersonsDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateManageSalesPersonsData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managesalespersonsUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, user, {
        headers: myheader,
      });

      dispatch(updateManageSalesPersonsDataSuccess(response.data));
      dispatch(managesalespersonsGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated ManageSalesPersons",
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
      dispatch(updateManageSalesPersonsDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteManageSalesPersons = (id, data) => async (dispatch) => {
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
      dispatch(managesalespersonsGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadManageSalesPersons =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    dispatch(managesalespersonsPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/upload`, user, {
        headers: myheader,
      });
      dispatch(uploadManageSalesPersonsSuccess(response.data));
      dispatch(managesalespersonsGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Uploaded ManageSalesPersons",
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
      dispatch(uploadManageSalesPersonsFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };
