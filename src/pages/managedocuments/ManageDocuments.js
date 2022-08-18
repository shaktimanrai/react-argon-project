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
// import EditManageDocuments from "./EditTableMaster/EditManageDocuments";
// import DeleteButton from "Helpers/DeleteButton";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import InputBase from "@mui/material/InputBase";
// import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import EditManageDocuments from "./EditManageDocuments";
import UploadManageDocuments from "./UploadManageDocuments";


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
function ManageDocuments(props) {
  const [pageSize, setPageSize] = React.useState(10);
  const columns = [
    { field: "id", headerName: " Id", flex: 1 },
    { field: "module", headerName: "Module", flex: 1 },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "type_of_doc",
      headerName: "Type_Of_Doc",
      flex: 1,
    },
  
     {
       field: "actions",
       headerName: "Actions",
       flex: 1,
       sortable: false,
       disableClickEventBubbling: true,
       renderCell: (params) => {
         return <EditManageDocuments data={params.row} index={params.row.id} />;
       },
     },
  ];

  const [searchText, setSearchText] = useState("");

  const rows = props.managedocuments?.isLoading
    ? []
    : props.managedocuments?.document_management?.length > 0
    ? props.managedocuments?.document_management.filter((item) => {
           return item.module
             .trim()
             .toLowerCase()
             .includes(searchText.trim().toLowerCase()) || item.status
             .trim()
             .toLowerCase()
             .includes(searchText.trim().toLowerCase()) || item.type_of_doc
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
    props.onManageDocumentsGetData(data);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  console.log("managedocuments", props.managedocuments);
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
    console.log("values in ManageDocuments:", values);
    setSubmitting(true);

    let user = {
      module: values.module,
      status: values.status,
      type_of_doc: values.type_of_doc,

    };

    console.log("Data of ManageDocuments:", user);
    props.onPostManageDocumentsData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-pink p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">ManageDocuments</strong>
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
            Add New ManageDocuments{" "}
          </ModalHeader>

          {props.managedocuments?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                module: "",
                status: "",
                type_of_doc: "",
             
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                module: Yup.string().required("required"),
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
                          id="status"
                          label="Remarks *"
                          name="status"
                          value={formProps.values.status}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.status &&
                            Boolean(formProps.errors.status)
                          }
                          helperText={
                            formProps.touched.status &&
                            formProps.errors.status
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
                          id="type_of_doc"
                          label="Name *"
                          name="type_of_doc"
                          value={formProps.values.type_of_doc}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.type_of_doc &&
                            Boolean(formProps.errors.type_of_doc)
                          }
                          helperText={
                            formProps.touched.type_of_doc &&
                            formProps.errors.type_of_doc
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
             <UploadManageDocuments />
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
          loading={props.managedocuments?.isLoading ? true : false}
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
    managedocuments: state.entities.managedocuments.managedocuments,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onManageDocumentsGetData: (data) => dispatch(actions.managedocumentsGetData(data)),
    onDeleteManageDocuments: (id, data) =>
      dispatch(actions.deleteManageDocuments(id, data)),
    onPostManageDocumentsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postManageDocumentsData(data, user, toggle, setSubmitting)),
    updateManageDocumentsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateManageDocumentsData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDocuments);
