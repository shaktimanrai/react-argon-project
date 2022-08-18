 /* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import * as Yup from "yup";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  InputGroup,
  Label,
} from "reactstrap";
import { Form, Formik } from "formik";
import { connect } from "react-redux";

import LinerLoader from "components/Loaders/LinerLoader";
import * as actions from "store/creators";
import TextField from "@material-ui/core/TextField";
function UploadMeetings(props) {
  let data = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Meetings:", values);
    setSubmitting(true);

    const user = new FormData();
    user.append("file", values.file);
    props.uploadMeetings(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <div>
      <Button
        className="btn-warning p-2"
        onClick={() => {
          toggle();
        }}
      >
        <i className="fa fa-upload text-white mr-2" />
        File Upload
      </Button>
      <Modal className="modal-md" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Upload Meetings Data
        </ModalHeader>

        {props.meetings?.isPostLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              file: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              file: Yup.string().required("required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group">
                  <Col md={12}>
                    <Label>File Upload here</Label>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        id="file"
                        name="file"
                        type="file"
                        value={formProps.values.file}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.file &&
                          Boolean(formProps.errors.file)
                        }
                        helperText={
                          formProps.touched.file && formProps.errors.file
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
    uploadMeetings: (data, user, toggle, setSubmitting) =>
      dispatch(actions.uploadMeetings(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadMeetings);
