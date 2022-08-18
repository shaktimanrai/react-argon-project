/*eslint-disable*/
import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";

var ps;

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  const [caseCollapsed, setCaseCollapsed] = useState(false);
  const [reportCollapsed, setReportCollapsed] = useState(false);
  const [reportCollapsed2, setReportCollapsed2] = useState(false);
  const [userMasterCollapsed, setUserMasterCollapsed] = useState(false);
  const [OrderHistorreyCollapsed, setOrderHistoryCollapsed] = useState(false);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  if (props.login?.login?.User?.role === "admin")
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              
               <img  
                 alt={logo.imgAlt}
                 className="navbar-brand-img"
                 src={logo.imgSrc} 
               />
            
            </NavbarBrand>
          ) : null}
          User
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/theme/team-1-800x800.jpg")
                          .default
                      }
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                   <span>Logout</span> 
                </DropdownItem> 
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <PerfectScrollbar className="sidebar-nav">
              <Nav vertical navbar>
                <li>
                  <NavItem>
                    <NavLink
                      to="/"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-user-run text-blue" />
                      Dashboard
                    </NavLink>
                  </NavItem>
                </li>
                 
              <li>
                  <NavItem>
                    <NavLink
                      to="/admin/properties"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-user-run text-blue" />
                      Properties
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/menu"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-user-run text-blue" />
                      Menu
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/menu2"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-user-run text-blue" />
                      Menu
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/side"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-user-run text-blue" />
                      Side
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/managecommunication"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-user-run text-blue" />
                      ManageCommunication
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/managecommunications"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-user-run text-blue" />
                      ManageCommunications
                    </NavLink>
                  </NavItem>
                </li>
               
                 <li>
                  <NavItem>
                    <NavLink
                      to="/admin/managenotifications"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-user-run text-blue" />
                      ManageNotifications
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/managemasters"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-user-run text-blue" />
                      ManageMasters
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/managemaster"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-user-run text-blue" />
                      ManageMaster
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/managedocuments"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-user-run text-blue" />
                      ManageDocuments
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/managesubscriptionplans"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-user-run text-blue" />
                      ManageSubscriptionPlans
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/managesalespersons"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-user-run text-blue" />
                      ManageSalesPersons
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/meetings"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-user-run text-blue" />
                      Meetings
                    </NavLink>
                  </NavItem>
                </li>
                <li className="nav-item">
                  <NavItem>
                    <a
                      className="nav-link active"
                      data-toggle="collapse"
                      role="button"
                      name="casemaster"
                      onClick={() => setCaseCollapsed(!caseCollapsed)}
                      aria-expanded={caseCollapsed ? "true" : "false"}
                    >
                      <i className="ni ni-trophy text-yellow" />
                      Master
                    </a>
                  </NavItem>
                  <Collapse isOpen={caseCollapsed}>
                    <ul className="nav nav-sm flex-column">
                      {/* nav nav-treeview  */}
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/group"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="ni ni-map-big text-orange" />
                            Group Master
                          </NavLink>
                        </NavItem>
                      </li>
                    </ul>
                  </Collapse>
                </li>

                <li>
                  <NavItem>
                    <a
                      className="nav-link active"
                      data-toggle="collapse"
                      role="button"
                      name="casemaster"
                      onClick={() =>
                        setUserMasterCollapsed(!userMasterCollapsed)
                      }
                      aria-expanded={userMasterCollapsed ? "true" : "false"}
                    >
                      <i className="fa fa-user text-black" />
                      User Master
                    </a>
                  </NavItem>
                  <Collapse isOpen={userMasterCollapsed}>
                    <ul className="nav nav-sm flex-column">
                      {/* nav nav-treeview  */}
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/add-user"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="fa fa-user-check text-orange" />
                            Add User
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/rights"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="fa fa-hand-point-right text-blue"></i>
                            Rights
                          </NavLink>
                        </NavItem>
                      </li>
                    </ul>
                  </Collapse>
                </li>
              </Nav>

              {/* </Collapse> */}
            </PerfectScrollbar>
          </Collapse>
        </Container>
      </Navbar>
    );
  else {
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          {/* User */}
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/theme/team-1-800x800.jpg")
                          .default
                      }
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <PerfectScrollbar className="sidebar-nav">
              <Nav vertical navbar>
                {props.login?.login.User?.rights?.length > 0 &&
                  props.login?.login.User?.rights[0]?.view == 1 && (
                    <li>
                      <NavItem>
                        <NavLink
                          to="/"
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <i className="ni ni-user-run text-blue" />
                          Dashboard
                        </NavLink>
                      </NavItem>
                    </li>
                  )}

                {props.login?.login.User?.rights?.length > 0 &&
                  (props.login?.login.User?.rights[1]?.view == 1 ||
                    props.login?.login.User?.rights[2]?.view == 1 ||
                    props.login?.login.User?.rights[3]?.view == 1 ||
                    props.login?.login.User?.rights[4]?.view == 1 ||
                    props.login?.login.User?.rights[5]?.view == 1 ||
                    props.login?.login.User?.rights[6]?.view == 1) && (
                    <li className="nav-item">
                      <NavItem>
                        <a
                          className="nav-link active"
                          data-toggle="collapse"
                          role="button"
                          name="casemaster"
                          onClick={() => setCaseCollapsed(!caseCollapsed)}
                          aria-expanded={caseCollapsed ? "true" : "false"}
                        >
                          <i className="ni ni-trophy text-yellow" />
                          Master
                        </a>
                      </NavItem>
                      <Collapse isOpen={caseCollapsed}>
                        <ul className="nav nav-sm flex-column">
                          {props.login?.login.User?.rights?.length > 0 &&
                            props.login?.login.User?.rights[1]?.view == 1 && (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/group"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active"
                                  >
                                    <i className="ni ni-map-big text-orange" />
                                    Group Master
                                  </NavLink>
                                </NavItem>
                              </li>
                            )}

                          {props.login?.login.User?.rights?.length > 0 &&
                            props.login?.login.User?.rights[2]?.view == 1 && (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/client"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active"
                                  >
                                    <i className="ni ni-single-02 text-green" />
                                    Client Master
                                  </NavLink>
                                </NavItem>
                              </li>
                            )}

                          {props.login?.login.User?.rights?.length > 0 &&
                            props.login?.login.User?.rights[3]?.view == 1 && (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/subclient"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active"
                                  >
                                    <i className="ni ni-badge text-yellow" />
                                    Sub Client Master
                                  </NavLink>
                                </NavItem>
                              </li>
                            )}

                          {props.login?.login.User?.rights?.length > 0 &&
                            props.login?.login.User?.rights[4]?.view == 1 && (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/expense"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active"
                                  >
                                    <i className="ni ni-credit-card text-blue" />
                                    Expense Master
                                  </NavLink>
                                </NavItem>
                              </li>
                            )}

                          {props.login?.login.User?.rights?.length > 0 &&
                            props.login?.login.User?.rights[5]?.view == 1 && (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/company"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active"
                                  >
                                    <i className="ni ni-briefcase-24 text-orange" />
                                    Company Master
                                  </NavLink>
                                </NavItem>
                              </li>
                            )}
                          {props.login?.login.User?.rights?.length > 0 &&
                            props.login?.login.User?.rights[6]?.view == 1 && (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/service"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active"
                                  >
                                    <i className="ni ni-laptop text-purple" />
                                    Service Master
                                  </NavLink>
                                </NavItem>
                              </li>
                            )}
                        </ul>
                      </Collapse>
                    </li>
                  )}

                {props.login?.login.User?.rights?.length > 0 &&
                  props.login?.login.User?.rights[7]?.view == 1 && (
                    <li>
                      <NavItem>
                        <NavLink
                          to="/admin/project"
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <i className="ni ni-palette text-red" />
                          Project Details
                        </NavLink>
                      </NavItem>
                    </li>
                  )}

                {props.login?.login.User?.rights?.length > 0 &&
                  props.login?.login.User?.rights[12]?.view == 1 && (
                    <li>
                      <NavItem>
                        <NavLink
                          to="/admin/task"
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <i className="ni ni-calendar-grid-58 text-info" />
                          Task Details
                        </NavLink>
                      </NavItem>
                    </li>
                  )}

                {props.login?.login.User?.rights?.length > 0 &&
                  props.login?.login.User?.rights[8]?.view == 1 && (
                    <li>
                      <NavItem>
                        <NavLink
                          to="/admin/expense-management"
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <i className="ni ni-money-coins text-green"></i>
                          Expense Management
                        </NavLink>
                      </NavItem>
                    </li>
                  )}

                {props.login?.login.User?.rights?.length > 0 &&
                  props.login?.login.User?.rights[13]?.view == 1 && (
                    <li>
                      <NavItem>
                        <a
                          className="nav-link active"
                          data-toggle="collapse"
                          role="button"
                          name="casemaster"
                          onClick={() => setReportCollapsed2(!reportCollapsed2)}
                          aria-expanded={reportCollapsed2 ? "true" : "false"}
                        >
                          <i className="ni ni-camera-compact text-info"></i>
                          Report
                        </a>
                      </NavItem>
                      <Collapse isOpen={reportCollapsed2}>
                        <ul className="nav nav-sm flex-column">
                          {/* nav nav-treeview  */}
                          <li>
                            <NavItem>
                              <NavLink
                                to="/admin/invoice-report"
                                tag={NavLinkRRD}
                                onClick={closeCollapse}
                                activeClassName="active"
                              >
                                <i className="ni ni-watch-time text-orange" />
                                Invoice
                              </NavLink>
                            </NavItem>
                          </li>
                          <li>
                            <NavItem>
                              <NavLink
                                to="/admin/debit-note-report"
                                tag={NavLinkRRD}
                                onClick={closeCollapse}
                                activeClassName="active"
                              >
                                <i className="ni ni-world text-blue" />
                                Debit Note
                              </NavLink>
                            </NavItem>
                          </li>
                        </ul>
                      </Collapse>
                    </li>
                  )}

                {props.login?.login.User?.rights?.length > 0 &&
                  (props.login?.login.User?.rights[10]?.view == 1 ||
                    props.login?.login.User?.rights[9]?.view == 1) && (
                    <li>
                      <NavItem>
                        <a
                          className="nav-link active"
                          data-toggle="collapse"
                          role="button"
                          name="casemaster"
                          onClick={() => setReportCollapsed(!reportCollapsed)}
                          aria-expanded={reportCollapsed ? "true" : "false"}
                        >
                          <i className="ni ni-basket text-pink" />
                          Billing
                        </a>
                      </NavItem>
                      <Collapse isOpen={reportCollapsed}>
                        <ul className="nav nav-sm flex-column">
                          {props.login?.login.User?.rights?.length > 0 &&
                            props.login?.login.User?.rights[9]?.view == 1 && (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/invoice"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active"
                                  >
                                    <i className="ni ni-box-2 text-orange" />
                                    Invoice
                                  </NavLink>
                                </NavItem>
                              </li>
                            )}
                          {props.login?.login.User?.rights?.length > 0 &&
                            props.login?.login.User?.rights[10]?.view == 1 && (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/debit-note"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active"
                                  >
                                    <i className="ni ni-check-bold text-blue" />
                                    Debit Note
                                  </NavLink>
                                </NavItem>
                              </li>
                            )}
                        </ul>
                      </Collapse>
                    </li>
                  )}

                <li>
                  <NavItem>
                    <a
                      className="nav-link active"
                      data-toggle="collapse"
                      role="button"
                      name="casemaster"
                      onClick={() =>
                        setUserMasterCollapsed(!userMasterCollapsed)
                      }
                      aria-expanded={userMasterCollapsed ? "true" : "false"}
                    >
                      <i className="fa fa-user text-black" />
                      User Master
                    </a>
                  </NavItem>
                  <Collapse isOpen={userMasterCollapsed}>
                    <ul className="nav nav-sm flex-column">
                      
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/add-user"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="fa fa-user-check text-orange" />
                            Add User
                          </NavLink>
                        </NavItem>
                      </li>
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/rights"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            <i className="fa fa-hand-point-right text-blue"></i>
                            Rights
                          </NavLink>
                        </NavItem>
                      </li>
                    </ul>
                  </Collapse>
                </li>
              </Nav>

              {/* </Collapse> */}
            </PerfectScrollbar>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
  };
};

export default connect(mapStateToProps)(Sidebar);
