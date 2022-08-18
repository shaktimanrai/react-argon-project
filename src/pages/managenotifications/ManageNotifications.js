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
// import EditManageNotifications from "./EditTableMaster/EditManageNotifications";
// import DeleteButton from "Helpers/DeleteButton";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import InputBase from "@mui/material/InputBase";
// import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import EditManageNotifications from "./EditManageNotifications";
import UploadManageNotifications from "./UploadManageNotifications";


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
function ManageNotifications(props) {
  const [pageSize, setPageSize] = React.useState(10);
  const columns = [
    { field: "propertyid", headerName: "property Id", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },

    {
      field: "size",
      headerName: "Size",
      flex: 1,
    },
    {
      field: "corner",
      headerName: "Corner",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "plot_no",
      headerName: "Plot_No",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "direction",
      headerName: "Direction",
      flex: 1,
    },
    {
      field: "sector_no",
      headerName: "Sector_No",
      flex: 1,
    },
    {
      field: "park_facing",
      headerName: "Park_Facing",
      flex: 1,
    },
    {
      field: "transaction_type",
      headerName: "Transaction_Type",
      flex: 1,
    },
     {
       field: "actions",
       headerName: "Actions",
       flex: 1,
       sortable: false,
       disableClickEventBubbling: true,
       renderCell: (params) => {
        return <EditManageNotifications data={params.row} index={params.row.id} />;
       },
     },
  ];

  const [searchText, setSearchText] = useState("");

  const rows = props.managenotifications?.isLoading
    ? []
    : props.managenotifications?.listing_site?.length > 0
    ? props.managenotifications?.listing_site.filter((item) => {
          return item.city
           .trim()
            .toLowerCase()
           .includes(searchText.trim().toLowerCase()) || item.size
           .trim()
            .toLowerCase()
           .includes(searchText.trim().toLowerCase()) || item.corner
           .trim()
            .toLowerCase()
           .includes(searchText.trim().toLowerCase()) || item.address
           .trim()
            .toLowerCase()
           .includes(searchText.trim().toLowerCase()) || item.plot_no
           .trim()
            .toLowerCase()
           .includes(searchText.trim().toLowerCase()) || item.category
           .trim()
            .toLowerCase()
           .includes(searchText.trim().toLowerCase()) || item.direction
           .trim()
            .toLowerCase()
           .includes(searchText.trim().toLowerCase()) || item.sector_no
           .trim()
            .toLowerCase()
           .includes(searchText.trim().toLowerCase()) || item.park_facing
           .trim()
            .toLowerCase()
           .includes(searchText.trim().toLowerCase()) || item.transaction_type
           .trim()
            .toLowerCase()
           .includes(searchText.trim().toLowerCase());;
         })
      :[];

  let data = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.onManageNotificationsGetData(data);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  console.log("managenotifications", props.managenotifications);
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
    console.log("values in ManageNotifications:", values);
    setSubmitting(true);

    let user = {
      city: values.city,
      size: values.size,
      corner: values.corner,
      address: values.address,
      plot_no: values.plot_no,
      category: values.category,
      direction: values.direction,
      sector_no: values.sector_no,
      park_facing: values.park_facing,
      transaction_type: values.transaction_type,
    };

    console.log("Data of ManageNotifications:", user);
    props.onPostManageNotificationsData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-pink p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">ManageNotifications</strong>
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
            Add New ManageNotifications{" "}
          </ModalHeader>

          {props.managenotifications?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                city: "",
                size: "",
                corner: "",
                address: "",
                plot_no: "",
                category: "",
                direction: "",
                sector_no: "",
                park_facing: "",
                transaction_type: "", 
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                city: Yup.string().required("required"),
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
                          id="city"
                          label="Name *"
                          name="city"
                          value={formProps.values.city}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.city &&
                            Boolean(formProps.errors.city)
                          }
                          helperText={
                            formProps.touched.city &&
                            formProps.errors.city
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
                          id="size"
                          label="Remarks *"
                          name="size"
                          value={formProps.values.size}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.size &&
                            Boolean(formProps.errors.size)
                          }
                          helperText={
                            formProps.touched.size &&
                            formProps.errors.size
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
                          id="corner"
                          label="Name *"
                          name="corner"
                          value={formProps.values.corner}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.corner &&
                            Boolean(formProps.errors.corner)
                          }
                          helperText={
                            formProps.touched.corner &&
                            formProps.errors.corner
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
                          id="address"
                          label="Remarks *"
                          name="address"
                          value={formProps.values.address}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.address &&
                            Boolean(formProps.errors.address)
                          }
                          helperText={
                            formProps.touched.address &&
                            formProps.errors.address
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
                          id="plot_no"
                          label="Name *"
                          name="plot_no"
                          value={formProps.values.plot_no}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.plot_no &&
                            Boolean(formProps.errors.plot_no)
                          }
                          helperText={
                            formProps.touched.plot_no &&
                            formProps.errors.plot_no
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
                          id="category"
                          label="Remarks *"
                          name="category"
                          value={formProps.values.category}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.category &&
                            Boolean(formProps.errors.category)
                          }
                          helperText={
                            formProps.touched.category &&
                            formProps.errors.category
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
                          id="direction"
                          label="Name *"
                          name="direction"
                          value={formProps.values.direction}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.direction &&
                            Boolean(formProps.errors.direction)
                          }
                          helperText={
                            formProps.touched.direction &&
                            formProps.errors.direction
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
                          id="sector_no"
                          label="Remarks *"
                          name="sector_no"
                          value={formProps.values.sector_no}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.sector_no &&
                            Boolean(formProps.errors.sector_no)
                          }
                          helperText={
                            formProps.touched.sector_no &&
                            formProps.errors.sector_no
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
                          id="park_facing"
                          label="Name *"
                          name="park_facing"
                          value={formProps.values.park_facing}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.park_facing &&
                            Boolean(formProps.errors.park_facing)
                          }
                          helperText={
                            formProps.touched.park_facing &&
                            formProps.errors.park_facing
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
                          id="transaction_type"
                          label="Remarks *"
                          name="transaction_type"
                          value={formProps.values.transaction_type}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.transaction_type &&
                            Boolean(formProps.errors.transaction_type)
                          }
                          helperText={
                            formProps.touched.transaction_type &&
                            formProps.errors.transaction_type
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
               <UploadManageNotifications /> 
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
          loading={props.managenotifications?.isLoading ? true : false}
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
    managenotifications: state.entities.managenotifications.managenotifications,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onManageNotificationsGetData: (data) => dispatch(actions.managenotificationsGetData(data)),
    onDeleteManageNotifications: (id, data) =>
      dispatch(actions.deleteManageNotifications(id, data)),
    onPostManageNotificationsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postManageNotificationsData(data, user, toggle, setSubmitting)),
    updateManageNotificationsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateManageNotificationsData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageNotifications);
