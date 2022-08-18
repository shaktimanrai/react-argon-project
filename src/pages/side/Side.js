/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  InputGroup,
} from "reactstrap";
import { Form, Formik } from "formik";
import { connect } from "react-redux";

import LinerLoader from "components/Loaders/LinerLoader";
import * as actions from "store/creators";
import TextField from "@material-ui/core/TextField";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
// import SideIcon from "@mui/icons-material/Side";
import SearchIcon from "@mui/icons-material/Search";
import EditSide from "./EditSide";
import UploadSide from "./UploadSide";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));
function Side(props) {
  const [pageSize, setPageSize] = React.useState(10);
  const columns = [
    { field: "propertyid", headerName: "property Id", flex: 1 },
    { field: "sitename", headerName: "Site Name", flex: 1 },

    {
      field: "siteaddress",
      headerName: "Site Address",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return <EditSide data={params.row} index={params.row.id} />;
      },
    },
  ];

  const [searchText, setSearchText] = useState("");

  const rows = props.side?.isLoading
    ? []
    : props.side?.side?.properties?.length > 0
    ? props.side?.side?.properties.filter((item) => {
          return item.sitename
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) || item.siteaddress
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase());;
        })
     : [];

  let data = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.onSideGetData(data);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  console.log("side", props.side);
  // const viewStatus =
  //   props.login?.login?.User?.role == "admin"
  //     ? true
  //     : props.login?.login.User?.rights?.length > 0 &&
  //       props.login?.login.User?.rights[1]?.view == 1
  //     ? true
  //     : false;

  // const deleteStatus =
  //   props.login?.login?.User?.role == "admin"
  //     ? true
  //     : props.login?.login.User?.rights?.length > 0 &&
  //       props.login?.login.User?.rights[1]?.delete == 1
  //     ? true
  //     : false;

  // const updateStatus =
  //   props.login?.login?.User?.role == "admin"
  //     ? true
  //     : props.login?.login.User?.rights?.length > 0 &&
  //       props.login?.login.User?.rights[1]?.update == 1
  //     ? true
  //     : false;
  const createStatus =
    props.login?.login?.User?.role == "admin"
      ? true
      : props.login?.login.User?.rights?.length > 0 &&
        props.login?.login.User?.rights[1]?.create == 1
      ? true
      : false;

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Side:", values);
    setSubmitting(true);

    let user = {
      sitename: values.sitename,
      siteaddress: values.siteaddress,
    };

    console.log("Data of Side:", user);
    props.onPostSideData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-pink p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">Side Master</strong>
          <div>
            {createStatus && (
              <Button
                className="btn-success p-2"
                onClick={() => {
                  toggle();
                }}
              >
                <i className="fa fa-plus text-white mr-2" />
                Add New
              </Button>
            )}
          </div>
        </div>
        <Modal className="modal-md" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} className="d-flex align-items-center">
            Add new Side Master{" "}
          </ModalHeader>

          {props.side?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                sitename: "",
                siteaddress: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                sitename: Yup.string().required("required"),
              })}
            >
              {(formProps) => (
                <Form>
                  <Row className="form-group">
                    <Col md={12}>
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          id="sitename"
                          label="Name *"
                          name="sitename"
                          value={formProps.values.sitename}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.sitename &&
                            Boolean(formProps.errors.sitename)
                          }
                          helperText={
                            formProps.touched.sitename &&
                            formProps.errors.sitename
                          }
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={12}>
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          id="siteaddress"
                          label="Remarks"
                          name="siteaddress"
                          value={formProps.values.siteaddress}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.siteaddress &&
                            Boolean(formProps.errors.siteaddress)
                          }
                          helperText={
                            formProps.touched.siteaddress &&
                            formProps.errors.siteaddress
                          }
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row style={{ justifyContent: "center" }}>
                    <Col md={4}>
                      <Button type="reset" color="danger" block>
                        <b>Reset</b>
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        type="submit"
                        disabled={formProps.isSubmitting}
                        color="primary"
                        block
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </Modal>
      </CardHeader>
      <div className="mt-4 ml-4 mr-4">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar className="d-flex justify-content-between">
              <UploadSide />
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <CardBody style={{ height: 520, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={props.side?.isLoading ? true : false}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
          getRowId={(row) => row.propertyid}
          components={{
            Toolbar: CustomToolbar,
          }}
          checkboxSelection
          disableSelectionOnClick
          // isRowSelectable={(params) => params.row.size < 50}

          // autoPageSize
          // autoHeight
        />
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    side: state.entities.side,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSideGetData: (data) => dispatch(actions.sideGetData(data)),
    onDeleteSide: (id, data) =>
      dispatch(actions.deleteSide(id, data)),
    onPostSideData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postSideData(data, user, toggle, setSubmitting)),
    updateSideData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateSideData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Side);
