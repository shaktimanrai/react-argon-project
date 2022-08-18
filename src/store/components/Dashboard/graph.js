import axios from "../../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../../shared/baseURL";

// BPO GRAPH actionTypes

const BPO_GRAPH_SET_DATA = "BPO_GRAPH_SET_DATA";
const BPO_GRAPH_FAIL_DATA = "BPO_GRAPH_FAIL_DATA";
const BPO_GRAPH_LOADING = "BPO_GRAPH_LOADING";

// GBQ GRAPH actionTypes

const GBQ_GRAPH_SET_DATA = "GBQ_GRAPH_SET_DATA";
const GBQ_GRAPH_FAIL_DATA = "GBQ_GRAPH_FAIL_DATA";
const GBQ_GRAPH_LOADING = "GBQ_GRAPH_LOADING";

// GSQ GRAPH actionTypes

const GSQ_GRAPH_SET_DATA = "GSQ_GRAPH_SET_DATA";
const GSQ_GRAPH_FAIL_DATA = "GSQ_GRAPH_FAIL_DATA";
const GSQ_GRAPH_LOADING = "GSQ_GRAPH_LOADING";

export const bpoGraphSetData = (bpoGraph) => {
  return {
    type: BPO_GRAPH_SET_DATA,
    bpoGraph: bpoGraph,
  };
};

export const bpoGraphFailData = (error) => {
  return {
    type: BPO_GRAPH_FAIL_DATA,
    error: error,
  };
};

export const bpoGraphLoading = () => {
  return {
    type: BPO_GRAPH_LOADING,
  };
};

export const bpoGraphGetData = (data) => {
  return (dispatch) => {
    dispatch(bpoGraphLoading());
    axios
      .get(baseUrl + "get-bpo-graph", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(bpoGraphSetData(res.data));
      })

      .catch((error) => dispatch(bpoGraphFailData(error)));
  };
};

export const GBQGraphSetData = (GBQGraph) => {
  return {
    type: GBQ_GRAPH_SET_DATA,
    GBQGraph: GBQGraph,
  };
};

export const GBQGraphFailData = (error) => {
  return {
    type: GBQ_GRAPH_FAIL_DATA,
    error: error,
  };
};

export const GBQGraphLoading = () => {
  return {
    type: GBQ_GRAPH_LOADING,
  };
};

export const GBQGraphGetData = (data) => {
  return (dispatch) => {
    dispatch(GBQGraphLoading());
    axios
      .get(baseUrl + "get-booked-quantity-graph", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(GBQGraphSetData(res.data));
      })

      .catch((error) => dispatch(GBQGraphFailData(error)));
  };
};

export const GSQGraphSetData = (GSQGraph) => {
  return {
    type: GSQ_GRAPH_SET_DATA,
    GSQGraph: GSQGraph,
  };
};

export const GSQGraphFailData = (error) => {
  return {
    type: GSQ_GRAPH_FAIL_DATA,
    error: error,
  };
};

export const GSQGraphLoading = () => {
  return {
    type: GSQ_GRAPH_LOADING,
  };
};

export const GSQGraphGetData = (data) => {
  return (dispatch) => {
    dispatch(GSQGraphLoading());
    axios
      .get(baseUrl + "get-shipped-quantity-graph", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(GSQGraphSetData(res.data));
      })

      .catch((error) => dispatch(GSQGraphFailData(error)));
  };
};

const initialState = {
  bpoGraph: [],
  error: false,
  isLoading: false,
};

export const BpoGraph = (state = initialState, action) => {
  switch (action.type) {
    case BPO_GRAPH_SET_DATA:
      return {
        ...state,
        bpoGraph: action.bpoGraph,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case BPO_GRAPH_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case BPO_GRAPH_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    default:
      return state;
  }
};

export const GBQGraph = (
  state = {
    GBQGraph: [],
    GSQGraph: [],
    error: false,
    isLoading: false,
    isGSQLoading: false,
  },
  action
) => {
  switch (action.type) {
    case GBQ_GRAPH_SET_DATA:
      return {
        ...state,
        GBQGraph: action.GBQGraph,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case GSQ_GRAPH_SET_DATA:
      return {
        ...state,
        GSQGraph: action.GSQGraph,
        error: false,
        isGSQLoading: false,
      };

    case GBQ_GRAPH_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case GBQ_GRAPH_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case GSQ_GRAPH_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isGSQLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case GSQ_GRAPH_LOADING:
      return {
        ...state,
        isGSQLoading: true,
        error: false,
      };

    default:
      return state;
  }
};
