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
  InputManageCommunication,
  InputGroup,
} from "reactstrap";
import DeleteButton from "Helpers/DeleteButton";

function EditManageCommunication(props) {
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
    console.log("values in ManageCommunication:", values);
    setSubmitting(true);

    let user = {
      name: values.name,
      type: values.type,
      module: values.module,
      edit_details: values.edit_details,
     
    };

    console.log("Data of ManageCommunication:", user);
    props.updateManageCommunicationData(data, user, toggle, setSubmitting);
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
          deleteFunction={() => props.onDeleteManageCommunication(props.data?.id, data)}
        />
      )}

      <Modal className="modal-md" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit ManageCommunication
        </ModalHeader>
        {props.managecommunication.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              name: props.data?.name,
              type: props.data.type,
              module: props.data?.module,
              edit_details: props.data.edit_details,
             
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
                    </   InputGroup>
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
                    </   InputGroup>
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
                    </   InputGroup>
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
                    </   InputGroup>
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
    managecommunication: state.entities.managecommunication,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onManageCommunicationGetData: (data) => dispatch(actions.managecommunicationGetData(data)),
    onDeleteManageCommunication: (id, data) => dispatch(actions.deleteManageCommunication(id, data)),
    onPostManageCommunicationData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postManageCommunicationData(data, user, toggle, setSubmitting)),
    updateManageCommunicationData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateManageCommunicationData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditManageCommunication);
