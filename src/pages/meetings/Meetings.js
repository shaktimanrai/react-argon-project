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
// import EditMeetings from "./EditTableMaster/EditMeetings";
// import DeleteButton from "Helpers/DeleteButton";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import InputBase from "@mui/material/InputBase";
// import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import EditMeetings from "./EditMeetings";
import UploadMeetings from "./UploadMeetings";


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
function Meetings(props) {
  const [pageSize, setPageSize] = React.useState(10);
  const columns = [
    { field: "id", headerName: "Id", flex: 1 },
    { field: "call", headerName: "Call", flex: 1 },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "add_lead",
      headerName: "Add_Lead",
      flex: 1,
    },
    {
      field: "schedule_meeting",
      headerName: "Schedule_Meeting",
      flex: 1,
    },
     {
       field: "actions",
       headerName: "Actions",
       flex: 1,
       sortable: false,
       disableClickEventBubbling: true,
       renderCell: (params) => {
         return <EditMeetings data={params.row} index={params.row.id} />;
       },
     },
  ];

  const [searchText, setSearchText] = useState("");

  const rows = props.meetings?.isLoading
    ? []
    : props.meetings?.meetings?.Customer_List?.length > 0
    ? props.meetings?.meetings?.Customer_List.filter((item) => {
           return item.call
             .trim()
             .toLowerCase()
             .includes(searchText.trim().toLowerCase()) || item.name
             .trim()
             .toLowerCase()
             .includes(searchText.trim().toLowerCase())  || item.mobile
             .trim()
             .toLowerCase()
             .includes(searchText.trim().toLowerCase())  || item.address
             .trim()
             .toLowerCase()
             .includes(searchText.trim().toLowerCase())  || item.add_lead
             .trim()
             .toLowerCase()
             .includes(searchText.trim().toLowerCase())  || item.schedule_meeting
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
    props.onMeetingsGetData(data);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  console.log("meetings", props.meetings);
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
    console.log("values in Meetings:", values);
    setSubmitting(true);

    let user = {
      call: values.call,
      name: values.name,
      mobile: values.mobile,
      address: values.address,
      add_lead: values.add_lead,
      schedule_meeting: values.schedule_meeting,
    };

    console.log("Data of Meetings:", user);
    props.onPostMeetingsData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-pink p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">Meetingsr</strong>
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
            Add New Meetings{" "}
          </ModalHeader>

          {props.meetings?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                call: "",
                name: "",
                mobile: "",
                address: "",
                add_lead: "",
                schedule_meeting: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                call: Yup.string().required("required"),
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
                          id="call"
                          label="Name *"
                          name="call"
                          value={formProps.values.call}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.call &&
                            Boolean(formProps.errors.call)
                          }
                          helperText={
                            formProps.touched.call &&
                            formProps.errors.call
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
                          id="name"
                          label="Remarks *"
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
                          id="mobile"
                          label="Name *"
                          name="mobile"
                          value={formProps.values.mobile}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.mobile &&
                            Boolean(formProps.errors.mobile)
                          }
                          helperText={
                            formProps.touched.mobile &&
                            formProps.errors.mobile
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
                          id="add_lead"
                          label="Name *"
                          name="add_lead"
                          value={formProps.values.add_lead}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.add_lead &&
                            Boolean(formProps.errors.add_lead)
                          }
                          helperText={
                            formProps.touched.add_lead &&
                            formProps.errors.add_lead
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
                          id="schedule_meeting"
                          label="Remarks *"
                          name="schedule_meeting"
                          value={formProps.values.schedule_meeting}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.schedule_meeting &&
                            Boolean(formProps.errors.schedule_meeting)
                          }
                          helperText={
                            formProps.touched.schedule_meeting &&
                            formProps.errors.schedule_meeting
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
               <UploadMeetings /> 
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
          loading={props.meetings?.isLoading ? true : false}
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
    meetings: state.entities.meetings.meetings,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMeetingsGetData: (data) => dispatch(actions.meetingsGetData(data)),
    onDeleteMeetings: (id, data) =>
      dispatch(actions.deleteMeetings(id, data)),
    onPostMeetingsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postMeetingsData(data, user, toggle, setSubmitting)),
    updateMeetingsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateMeetingsData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Meetings);
