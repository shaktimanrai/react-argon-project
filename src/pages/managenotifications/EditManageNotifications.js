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

function EditManageNotifications(props) {
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
    props.updateManageNotificationsData(data, user, toggle, setSubmitting);
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
          deleteFunction={() => props.onDeleteManageNotifications(props.data?.id, data)}
        />
      )}

      <Modal className="modal-md" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit ManageNotifications
        </ModalHeader>
        {props.managenotifications.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              city: props.data?.city,
              size: props.data.size,
              corner: props.data?.corner,
              address: props.data.address,
              plot_no: props.data?.plot_no,
              category: props.data.category,
              direction: props.data?.direction,
              sector_no: props.data.sector_no,
              park_facing: props.data?.park_facing,
              transaction_type: props.data.transaction_type,
              
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
                          formProps.touched.category && formProps.errors.category
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
                          formProps.touched.direction && formProps.errors.direction
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
                          formProps.touched.sector_no && formProps.errors.sector_no
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
                          formProps.touched.park_facing && formProps.errors.park_facing
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
                          formProps.touched.transaction_type && formProps.errors.transaction_type
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
    managenotifications: state.entities.managenotifications,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onManageNotificationsGetData: (data) => dispatch(actions.managenotificationsGetData(data)),
    onDeleteManageNotifications: (id, data) => dispatch(actions.deleteManageNotifications(id, data)),
    onPostManageNotificationsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postManageNotificationsData(data, user, toggle, setSubmitting)),
    updateManageNotificationsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateManageNotificationsData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditManageNotifications);
