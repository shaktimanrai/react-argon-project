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
// import EditManageMasters from "./EditTableMaster/EditManageMasters";
// import DeleteButton from "Helpers/DeleteButton";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import InputBase from "@mui/material/InputBase";
// import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import EditManageMasters from "./EditManageMasters";
import UploadManageMasters from "./UploadManageMasters";


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
function ManageMasters(props) {
  const [pageSize, setPageSize] = React.useState(10);
  const columns = [
    { field: "id", headerName: " Id", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },

    {
      field: "comments",
      headerName: "Comments",
      flex: 1,
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
    },
    {
      field: "property",
      headerName: "property",
      flex: 1,
    },
    {
      field: "lead_source",
      headerName: "Lead_Source",
      flex: 1,
    },
    {
      field: "sales_person",
      headerName: "Sales_Person",
      flex: 1,
    },
     {
       field: "actions",
       headerName: "Actions",
       flex: 1,
       sortable: false,
       disableClickEventBubbling: true,
       renderCell: (params) => {
        return <EditManageMasters data={params.row} index={params.row.id} />;
       },
     },
  ];

  const [searchText, setSearchText] = useState("");

  const rows = props.managemasters?.isLoading
    ? []
    : props.managemasters?.Lead_Details?.length > 0
    ? props.managemasters?.Lead_Details.filter((item) => {
           return item.status
             .trim()
           .toLowerCase()
             .includes(searchText.trim().toLowerCase()) || item.comments
             .trim()
           .toLowerCase()
             .includes(searchText.trim().toLowerCase()) || item.customer
             .trim()
           .toLowerCase()
             .includes(searchText.trim().toLowerCase()) || item.property
             .trim()
           .toLowerCase()
             .includes(searchText.trim().toLowerCase()) || item.lead_source
             .trim()
           .toLowerCase()
             .includes(searchText.trim().toLowerCase()) || item.sales_person
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
    props.onManageMastersGetData(data);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  console.log("managemasters", props.managemasters);
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
    console.log("values in ManageMasters:", values);
    setSubmitting(true);

    let user = {
      status: values.status,
      comments: values.comments,
      customer: values.customer,
      property: values.property,
      lead_source: values.lead_source,
      sales_person: values.sales_person,
    };

    console.log("Data of ManageMasters:", user);
    props.onPostManageMastersData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-pink p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">ManageMasters</strong>
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
            Add New ManageMasters{" "}
          </ModalHeader>

          {props.managemasters?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                status: "",
                comments: "",
                customer: "",
                property: "",
                lead_source: "",
                sales_person: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                status: Yup.string().required("required"),
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
                          id="status"
                          label="Name *"
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
                          id="comments"
                          label="Remarks *"
                          name="comments"
                          value={formProps.values.comments}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.comments &&
                            Boolean(formProps.errors.comments)
                          }
                          helperText={
                            formProps.touched.comments &&
                            formProps.errors.comments
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
                          id="customer"
                          label="Name *"
                          name="customer"
                          value={formProps.values.customer}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.customer &&
                            Boolean(formProps.errors.customer)
                          }
                          helperText={
                            formProps.touched.customer &&
                            formProps.errors.customer
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
                          id="property"
                          label="Remarks *"
                          name="property"
                          value={formProps.values.property}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.property &&
                            Boolean(formProps.errors.property)
                          }
                          helperText={
                            formProps.touched.property &&
                            formProps.errors.property
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
                          id="lead_source"
                          label="Name *"
                          name="lead_source"
                          value={formProps.values.lead_source}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.lead_source &&
                            Boolean(formProps.errors.lead_source)
                          }
                          helperText={
                            formProps.touched.lead_source &&
                            formProps.errors.lead_source
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
                          id="sales_person"
                          label="Remarks *"
                          name="sales_person"
                          value={formProps.values.sales_person}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.sales_person &&
                            Boolean(formProps.errors.sales_person)
                          }
                          helperText={
                            formProps.touched.sales_person &&
                            formProps.errors.sales_person
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
               <UploadManageMasters /> 
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
          loading={props.managemasters?.isLoading ? true : false}
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
    managemasters: state.entities.managemasters.managemasters,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onManageMastersGetData: (data) => dispatch(actions.managemastersGetData(data)),
    onDeleteManageMasters: (id, data) =>
      dispatch(actions.deleteManageMasters(id, data)),
    onPostManageMastersData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postManageMastersData(data, user, toggle, setSubmitting)),
    updateManageMastersData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateManageMastersData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageMasters);
