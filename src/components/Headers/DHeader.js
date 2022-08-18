// reactstrap components
import CircularLoader from "components/Loaders/CircularLoader";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import * as actions from "../../redux/creators";

const Header = (props) => {
  let data = {
    token: props.login?.login?.token,
  };
  useEffect(() => {
    props.countGetData(data);
  }, []);

  // console.log(`window pathname`, window.location.hash == "#/admin/index");
  return (
    <div
      className={`header bg-gradient-info ${
        window.location.hash === "#/admin/index"
          ? "pb-8 pt-5 pt-md-8"
          : "pb-4 pt-4 pt-md-5"
      }`}
      // className="header bg-gradient-info pb-4 pt-4 pt-md-8"
    >
      <Container fluid>
        <div className="header-body">
          {window.location.hash === "#/admin/index" ? (
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Advance Amount
                        </CardTitle>
                        {props.count.isLoading ? (
                          <CircularLoader />
                        ) : (
                          <span className="h2 font-weight-bold mb-0">
                            {props.count?.count?.advanceAmount} ₹
                          </span>
                        )}
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Pending Amount
                        </CardTitle>
                        {props.count.isLoading ? (
                          <CircularLoader />
                        ) : (
                          <span className="h2 font-weight-bold mb-0">
                            {props.count?.count?.pendingAmount} ₹
                          </span>
                        )}
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Pending Shipping
                        </CardTitle>
                        {props.count.isLoading ? (
                          <CircularLoader />
                        ) : (
                          <span className="h2 font-weight-bold mb-0">
                            {props.count?.count?.pendingShipping}
                          </span>
                        )}
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Pending LME Fixation
                        </CardTitle>
                        {props.count.isLoading ? (
                          <CircularLoader />
                        ) : (
                          <span className="h2 font-weight-bold mb-0">
                            {props.count?.count?.pendingLMEFixation}
                          </span>
                        )}
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    count: state.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    countGetData: (data) => dispatch(actions.countGetData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
