import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { store } from "../redux/store";

const RouteWithLayout = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;
  var loggedIn = store.getState().auth.isAuthenticated === true;

  return (
    <Route
      {...rest}
      // render={matchProps => (
      //   <Layout>
      //     <Component {...matchProps} />
      //   </Layout>

      render={(matchProps) =>
        loggedIn !== true ? (
          <Redirect to="/admin" />
        ) : (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )
      }
      // )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default RouteWithLayout;
