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

function EditManageMaster(props) {
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
    console.log("values in ManageMaster:", values);
    setSubmitting(true);

    let user = {
      sitename: values.sitename,
      siteaddress: values.siteaddress,
    };

    console.log("Data of ManageMaster:", user);
    props.updateManageMasterData(data, user, toggle, setSubmitting);
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
          deleteFunction={() => props.onDeleteManageMaster(props.data?.id, data)}
        />
      )}

      <Modal className="modal-md" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit ManageMaster
        </ModalHeader>
        {props.managemaster.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              sitename: props.data?.sitename,
              siteaddress: props.data.siteaddress,
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
                        id="sitename"
                        label="Name *"
                        name="sitename"
                        value={formProps.values.sitename}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.sitename &&
                          Boolean(formProps.errors.sitename)
                        }
                        helperText={
                          formProps.touched.sitename &&
                          formProps.errors.sitename
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
                        id="siteaddress"
                        label="Remarks"
                        name="siteaddress"
                        value={formProps.values.siteaddress}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.siteaddress &&
                          Boolean(formProps.errors.siteaddress)
                        }
                        helperText={
                          formProps.touched.siteaddress && formProps.errors.siteaddress
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
    managemaster: state.entities.managemaster,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onManageMasterGetData: (data) => dispatch(actions.managemasterGetData(data)),
    onDeleteManageMaster: (id, data) => dispatch(actions.deleteManageMaster(id, data)),
    onPostManageMasterData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postManageMasterData(data, user, toggle, setSubmitting)),
    updateManageMasterData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateManageMasterData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditManageMaster);
