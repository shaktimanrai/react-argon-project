import React, { useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Button } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import * as actions from "store/creators";
import { Formik, Form } from "formik";

import LinerLoader from "components/Loaders/LinerLoader";

function EditPageRights(props) {
  let data = {
    token: props.login?.login?.token,
    id: props.data.user_id,
  };
  console.log("Edit User:", props.data);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    // console.log("modal", modal);
    setModal(!modal);
    // console.log("modal", modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Edit Page Rights:", values);

    let user = {
      user_id: values.user_id,
      // pageSize: 10000,
      // pageno: 1,
      rights: [
        {
          id: values.id,
          user_id: values.user_id,
          page_id: values.page_id,
          create: values.create,
          delete: values.delete,
          view: values.view,
          update: values.update,
        },
      ],
    };

    props.updateRightsData(data, user, toggle, setSubmitting);
    setSubmitting(true);
    // setModal(false);
  };

  return (
    <div>
      <Button
        size="small"
        className="ml-2"
        variant="contained"
        color="warning"
        onClick={() => {
          setModal(!modal);
        }}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>

      <Modal className="modal-lg" isOpen={modal} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>
          {props?.data?.page?.name} Rights
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              id: props.data.id,
              user_id: props.data.user_id,
              page_id: props.data.page_id,
              create: props.data.create,
              delete: props.data.delete,
              view: props.data.view,
              update: props.data.update,
            }}
            onSubmit={handleSubmit}
          >
            {(formProps) => (
              <Form>
                {console.log("create:", formProps.values.create)}
                {console.log("view:", formProps.values.view)}
                {console.log("update:", formProps.values.update)}
                {console.log("delete:", formProps.values.delete)}
                <Row>
                  <Col md={3} className="pb-4">
                    <FormControlLabel
                      control={
                        <Switch
                          id="create"
                          name="create"
                          value={formProps.values.create}
                          checked={formProps.values.create == 1 ? true : false}
                          onChange={(event) => {
                            event.target.value == 1
                              ? formProps.setFieldValue("create", 0)
                              : formProps.setFieldValue("create", 1);
                          }}
                        />
                      }
                      label="Create"
                    />
                  </Col>
                  <Col md={3} className="pb-4">
                    <FormControlLabel
                      control={
                        <Switch
                          id="view"
                          name="view"
                          value={formProps.values.view}
                          onChange={(event) => {
                            event.target.value == 1
                              ? formProps.setFieldValue("view", 0)
                              : formProps.setFieldValue("view", 1);
                          }}
                          checked={formProps.values.view == 1 ? true : false}
                        />
                      }
                      label="View"
                    />
                  </Col>
                  <Col md={3} className="pb-4">
                    <FormControlLabel
                      control={
                        <Switch
                          id="update"
                          name="update"
                          value={formProps.values.update}
                          onChange={(event) => {
                            event.target.value == 1
                              ? formProps.setFieldValue("update", 0)
                              : formProps.setFieldValue("update", 1);
                          }}
                          checked={formProps.values.update == 1 ? true : false}
                        />
                      }
                      label="Update"
                    />
                  </Col>
                  <Col md={3} className="pb-4">
                    <FormControlLabel
                      control={
                        <Switch
                          id="delete"
                          name="delete"
                          value={formProps.values.delete}
                          onChange={(event) => {
                            event.target.value == 1
                              ? formProps.setFieldValue("delete", 0)
                              : formProps.setFieldValue("delete", 1);
                          }}
                          checked={formProps.values.delete == 1 ? true : false}
                        />
                      }
                      label="Delete"
                    />
                  </Col>
                </Row>

                <br />

                <br />

                <Row style={{ justifyContent: "center" }}>
                  <Col>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Col>

                  <Col>
                    <Button
                      color="error"
                      variant="contained"
                      fullWidth
                      onClick={() => toggle()}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter>
          {props.rights.isUpdateLoading && <LinerLoader />}
        </ModalFooter>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditPageRights);
