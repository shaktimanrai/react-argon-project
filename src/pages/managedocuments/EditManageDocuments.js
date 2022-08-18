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

function EditManageDocuments(props) {
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
    console.log("values in ManageDocuments:", values);
    setSubmitting(true);

    let user = {
      module: values.module,
      status: values.status,
      type_of_doc: values.type_of_doc,
   
    };

    console.log("Data of ManageDocuments:", user);
    props.updateManageDocumentsData(data, user, toggle, setSubmitting);
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
          deleteFunction={() => props.onDeleteManageDocuments(props.data?.id, data)}
        />
      )}

      <Modal className="modal-md" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit ManageDocuments
        </ModalHeader>
        {props.managedocuments.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              module: props.data?.module,
              status: props.data.status,
              type_of_doc: props.data?.type_of_doc,
           
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    managedocuments: state.entities.managedocuments,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onManageDocumentsGetData: (data) => dispatch(actions.managedocumentsGetData(data)),
    onDeleteManageDocuments: (id, data) => dispatch(actions.deleteManageDocuments(id, data)),
    onPostManageDocumentsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postManageDocumentsData(data, user, toggle, setSubmitting)),
    updateManageDocumentsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateManageDocumentsData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditManageDocuments);
