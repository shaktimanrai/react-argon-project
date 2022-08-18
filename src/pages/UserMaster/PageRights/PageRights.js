/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@material-ui/core/TextField";
import * as actions from "store/creators";

import PageRightsTable from "./PageRightsTable";

function PageRights(props) {
  let data = {
    token: props.login?.login?.token,
  };

  const [currentUser, setCurrentUser] = React.useState("");
  const flatProps = {
    options: props?.users?.isLoading
      ? []
      : props?.users?.users
          ?.filter((user) => user.role == "user")
          .map((user) => user?.name),
  };
  useEffect(() => {
    props.onUsersGetData(data);
    props.onRightsGetData(data);
  }, []);

  return (
    <div className="container-fluid">
      <br />
      <Card>
        <CardHeader className="bg-info text-white">
          <Row>
            <Col>
              <strong>Page Rights</strong>
            </Col>
            <Col md={4}></Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Autocomplete
            hidden={flatProps.options == [] ? true : false}
            sx={{ flex: "1 1 100%" }}
            {...flatProps}
            id="name"
            name="name"
            inputValue={currentUser}
            onInputChange={(e, value) => {
              console.log("value", value);
              setCurrentUser(value);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select User" variant="outlined" />
            )}
          />
          <PageRightsTable
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </CardBody>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.entities.userMaster.users,
    rights: state.entities.userMaster.rights,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUsersGetData: (data) => dispatch(actions.usersGetData(data)),
    onRightsGetData: (data) => dispatch(actions.rightsGetData(data)),
    onDeleteRights: (id, data) => dispatch(actions.deleteRights(id, data)),
    onPostRightsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postRightsData(data, user, toggle, setSubmitting)),
    updateRightsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateRightsData(data, user, toggle, setSubmitting)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageRights);
