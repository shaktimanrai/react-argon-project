import React from "react";
import {
  // useLocation,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { connect } from "react-redux";
import Header from "components/Headers/Header";
import PreLoader from "components/Loaders/PreLoader";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  // const location = useLocation();

  // React.useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   mainContent.current.scrollTop = 0;
  // }, [location]);
  console.log(`props.login.login`, props.login.login);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  if (props.login?.login?.length === 0) {
    return <Redirect to={"/auth/login"} />;
  }
  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <Container fluid>
          <AdminNavbar
            {...props}
            brandText={getBrandText(props.location.pathname)}
          />
        </Container>
        <Header />
        <React.Suspense fallback={<PreLoader />}>
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/admin/index" />
          </Switch>
        </React.Suspense>
        <Container fluid>{/* <AdminFooter /> */}</Container>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default withRouter(connect(mapStateToProps, null)(Admin));
