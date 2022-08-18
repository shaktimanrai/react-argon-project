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

function EditManageMasters(props) {
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

    console.log("Data of Group:", user);
    props.updateManageMastersData(data, user, toggle, setSubmitting);
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
          deleteFunction={() => props.onDeleteManageMasters(props.data?.id, data)}
        />
      )}

      <Modal className="modal-md" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit ManageMasters
        </ModalHeader>
        {props.managemasters.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              status: props.data?.status,
              comments: props.data.comments,
              customer: props.data?.customer,
              property: props.data.property,
              lead_source: props.data?.lead_source,
              sales_person: props.data.sales_person,
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
                          formProps.touched.sales_person && formProps.errors.sales_person
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
    managemasters: state.entities.managemasters,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onManageMastersGetData: (data) => dispatch(actions.managemastersGetData(data)),
    onDeleteManageMasters: (id, data) => dispatch(actions.deleteManageMasters(id, data)),
    onPostManageMastersData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postManageMastersData(data, user, toggle, setSubmitting)),
    updateManageMastersData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateManageMastersData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditManageMasters);
