import React, { useState } from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import * as actions from "../../../store/creators";
import LinerLoader from "components/Loaders/LinerLoader";
import TextField from "@material-ui/core/TextField";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  InputGroup,
} from "reactstrap";
import DeleteButton from "Helpers/DeleteButton";

function EditGroup(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: props.data?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const viewStatus =
    props.login?.login?.User?.role == "admin"
      ? true
      : props.login?.login.User?.rights?.length > 0 &&
        props.login?.login.User?.rights[1]?.view == 1
      ? true
      : false;

  const deleteStatus =
    props.login?.login?.User?.role == "admin"
      ? true
      : props.login?.login.User?.rights?.length > 0 &&
        props.login?.login.User?.rights[1]?.delete == 1
      ? true
      : false;

  const updateStatus =
    props.login?.login?.User?.role == "admin"
      ? true
      : props.login?.login.User?.rights?.length > 0 &&
        props.login?.login.User?.rights[1]?.update == 1
      ? true
      : false;
  const createStatus =
    props.login?.login?.User?.role == "admin"
      ? true
      : props.login?.login.User?.rights?.length > 0 &&
        props.login?.login.User?.rights[1]?.create == 1
      ? true
      : false;

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Group:", values);
    setSubmitting(true);

    let user = {
      group_name: values.group_name,
      remarks: values.remarks,
    };

    console.log("Data of Group:", user);
    props.updateGroupData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <div>
      {updateStatus && (
        <Button
          className="bg-gradient-yellow p-1"
          onClick={() => {
            toggle();
          }}
        >
          <i className="fa fa-edit" aria-hidden="true"></i>
        </Button>
      )}
      {deleteStatus && (
        <DeleteButton
          id={props.data?.id}
          deleteFunction={() => props.onDeleteGroup(props.data?.id, data)}
        />
      )}

      <Modal className="modal-md" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit Group
        </ModalHeader>
        {props.group.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              group_name: props.data?.group_name,
              remarks: props.data.remarks,
            }}
            onSubmit={handleSubmit}
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
                        id="group_name"
                        label="Name *"
                        name="group_name"
                        value={formProps.values.group_name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.group_name &&
                          Boolean(formProps.errors.group_name)
                        }
                        helperText={
                          formProps.touched.group_name &&
                          formProps.errors.group_name
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
                          formProps.touched.remarks && formProps.errors.remarks
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    group: state.entities.master.group,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGroupGetData: (data) => dispatch(actions.groupGetData(data)),
    onDeleteGroup: (id, data) => dispatch(actions.deleteGroup(id, data)),
    onPostGroupData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postGroupData(data, user, toggle, setSubmitting)),
    updateGroupData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateGroupData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditGroup);
