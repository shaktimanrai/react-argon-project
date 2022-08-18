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
// import EditManageCommunications from "./EditTableMaster/EditManageCommunications";
// import DeleteButton from "Helpers/DeleteButton";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
// import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
// import UploadManageCommunications from "./Upload/UploadManageCommunications";

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
function ManageCommunications(props) {
  const [pageSize, setPageSize] = React.useState(10);
  const columns = [
    { field: "propertyid", headerName: "property Id", flex: 1 },
    { field: "sitename", headerName: "Site Name", flex: 1 },

    {
      field: "siteaddress",
      headerName: "Site Address",
      flex: 1,
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   flex: 1,
    //   sortable: false,
    //   disableClickEventBubbling: true,
    //   renderCell: (params) => {
    //     return <EditManageCommunications data={params.row} index={params.row.id} />;
    //   },
    // },
  ];

  const [searchText, setSearchText] = useState("");

  const rows = props.managecommunications?.isLoading
    ? []
    : props.managecommunications?.properties?.length > 0
    ? props.managecommunications?.properties
    : // .filter((item) => {
      //     return item.managecommunications_name
      //       .trim()
      //       .toLowerCase()
      //       .includes(searchText.trim().toLowerCase());
      //   })
      [];

  let data = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.onManageCommunicationsGetData(data);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  console.log("managecommunications", props.managecommunications);
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
    console.log("values in ManageCommunications:", values);
    setSubmitting(true);

    let user = {
      managecommunications_name: values.managecommunications_name,
      remarks: values.remarks,
    };

    console.log("Data of ManageCommunications:", user);
    props.onPostManageCommunicationsData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-pink p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">ManageCommunications Master</strong>
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
            Add New ManageCommunications Master{" "}
          </ModalHeader>

          {props.managecommunications?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                managecommunications_name: "",
                remarks: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                managecommunications_name: Yup.string().required("required"),
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
                          id="managecommunications_name"
                          label="Name *"
                          name="managecommunications_name"
                          value={formProps.values.managecommunications_name}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.managecommunications_name &&
                            Boolean(formProps.errors.managecommunications_name)
                          }
                          helperText={
                            formProps.touched.managecommunications_name &&
                            formProps.errors.managecommunications_name
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
                          id="remarks"
                          label="Remarks"
                          name="remarks"
                          value={formProps.values.remarks}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.remarks &&
                            Boolean(formProps.errors.remarks)
                          }
                          helperText={
                            formProps.touched.remarks &&
                            formProps.errors.remarks
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
              {/* <UploadManageCommunications /> */}
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
          loading={props.managecommunications?.isLoading ? true : false}
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
    managecommunications: state.entities.managecommunications.managecommunications,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onManageCommunicationsGetData: (data) => dispatch(actions.managecommunicationsGetData(data)),
    onDeleteManageCommunications: (id, data) =>
      dispatch(actions.deleteManageCommunications(id, data)),
    onPostManageCommunicationsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postManageCommunicationsData(data, user, toggle, setSubmitting)),
    updateManageCommunicationsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateManageCommunicationsData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageCommunications);
