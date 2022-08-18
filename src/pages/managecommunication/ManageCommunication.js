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
// import EditManageCommunication from "./EditTableMaster/EditManageCommunication";
// import DeleteButton from "Helpers/DeleteButton";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import InputBase from "@mui/material/InputBase";
// import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import EditManageCommunication from "./EditManageCommunication";
import UploadManageCommunication from "./UploadManageCommunication";


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
function ManageCommunication(props) {
  const [pageSize, setPageSize] = React.useState(10);
  const columns = [
    { field: "id", headerName: "Id", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
     {
      field: "module",
      headerName: "Module",
      flex: 1,
     },
     {
      field: "edit_details",
      headerName: "Edit_Details",
      flex: 1,
     },

     {
      field: "action",
      headerName: "Action",
      flex: 1,
       sortable: false,
       disableClickEventBubbling: true,
     renderCell: (params) => {
         return <EditManageCommunication data={params.row} index={params.row.id} />;
       },
     },
  ];

  const [searchText, setSearchText] = useState("");

  const rows = props.managecommunication?.isLoading
    ? []
    : props.managecommunication?.Communication_management?.length > 0
    ? props.managecommunication?.Communication_management.filter((item) => {
           return item.name
             .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) || item.type
            .trim()
           .toLowerCase()
           .includes(searchText.trim().toLowerCase()) || item.module
           .trim()
          .toLowerCase()
          .includes(searchText.trim().toLowerCase()) || item.edit_details
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
    props.onManageCommunicationGetData(data);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  console.log("managecommunication", props.managecommunication);
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
    console.log("values in ManageCommunication:", values);
    setSubmitting(true);

    let user = {
      name: values.name,
      type: values.type,
      module: values.module,
      edit_details: values.edit_details,

    };

    console.log("Data of ManageCommunication:", user);
    props.onPostManageCommunicationData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-pink p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">ManageCommunication</strong>
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
            Add New ManageCommunication{" "}
          </ModalHeader>

          {props.managecommunication?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                name: "",
                type: "", 
                module: "", 
                edit_details: "", 
              }
            }
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("required"),
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
                          id="name"
                          label="Name *"
                          name="name"
                          value={formProps.values.name}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.name &&
                            Boolean(formProps.errors.name)
                          }
                          helperText={
                            formProps.touched.name &&
                            formProps.errors.name
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
                          id="type"
                          label="Remarks *"
                          name="type"
                          value={formProps.values.type}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.type &&
                            Boolean(formProps.errors.type)
                          }
                          helperText={
                            formProps.touched.type &&
                            formProps.errors.type
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
                          id="module"
                          label="Name *"
                          name="module"
                          value={formProps.values.module}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.module &&
                            Boolean(formProps.errors.module)
                          }
                          helperText={
                            formProps.touched.module &&
                            formProps.errors.module
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
                          id="edit_details"
                          label="Remarks *"
                          name="edit_details"
                          value={formProps.values.edit_details}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.edit_details &&
                            Boolean(formProps.errors.edit_details)
                          }
                          helperText={
                            formProps.touched.edit_details &&
                            formProps.errors.edit_details
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
               <UploadManageCommunication /> 
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
          loading={props.managecommunication?.isLoading ? true : false}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
          getRowId={(row) => row.id}
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
    managecommunication: state.entities.managecommunication.managecommunication,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onManageCommunicationGetData: (data) => dispatch(actions.managecommunicationGetData(data)),
    onDeleteManageCommunication: (id, data) =>
      dispatch(actions.deleteManageCommunication(id, data)),
    onPostManageCommunicationData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postManageCommunicationData(data, user, toggle, setSubmitting)),
    updateManageCommunicationData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateManageCommunicationData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageCommunication);
