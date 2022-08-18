import React, { useState } from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import * as actions from "store/creators";
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

function EditMeetings(props) {
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
    props.updateMeetingsData(data, user, toggle, setSubmitting);
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
          deleteFunction={() => props.onDeleteMeetings(props.data?.id, data)}
        />
      )}

      <Modal className="modal-md" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit Group
        </ModalHeader>
        {props.meetings.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              call: props.data?.call,
              name: props.data.name,
              mobile: props.data?.mobile,
              address: props.data.address,
              add_lead: props.data?.add_lead,
              schedule_meeting: props.data.schedule_meeting,
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
                          formProps.touched.schedule_meeting && formProps.errors.schedule_meeting
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
    meetings: state.entities.meetings,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMeetingsGetData: (data) => dispatch(actions.meetingsGetData(data)),
    onDeleteMeetings: (id, data) => dispatch(actions.deleteMeetings(id, data)),
    onPostMeetingsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postMeetingsData(data, user, toggle, setSubmitting)),
    updateMeetingsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateMeetingsData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditMeetings);
