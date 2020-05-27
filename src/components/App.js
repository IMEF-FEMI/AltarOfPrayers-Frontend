import "materialize-css/dist/css/materialize.min.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { initAuth } from "../utils/initAuth";
import { ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import Notifier from "./Notifier";
import appTheme from "../styles/appTheme";
import guestRoutes from "../routes";
import adminRoutes from "../routes/admin";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NotFound from "../views/NotFound";
import { client } from "../graphql/graphqlClient";
import CssBaseline from "@material-ui/core/CssBaseline";

initAuth();

class App extends Component {
  render() {
    var loggedIn = store.getState().auth.isAuthenticated === true;

    return (
      <div className="App">
        <Provider store={store}>
          <SnackbarProvider>
            <Notifier />
            <ApolloProvider client={client}>
              <BrowserRouter>
                <ThemeProvider theme={appTheme}>
                   <CssBaseline />
                  <div>
                    <Navbar guestLinks={guestRoutes} adminLinks={adminRoutes} />
                    <div>
                      <Switch>
                        {guestRoutes.map((prop, key) => {
                          //   <RouteWithLayout
                          //   exact
                          //   path={prop.path}
                          //   key={key}
                          //   layout={Main}
                          //   component={prop.component}
                          // />
                          return (
                            <Route
                              exact
                              path={prop.path}
                              key={key}
                              render={() =>
                                loggedIn === true ? (
                                  <Redirect to="/editions" />
                                ) : (
                                  <prop.component />
                                )
                              }
                            />
                          );
                        })}
                        {adminRoutes.map((prop, key) => {
                          return (
                            <Route
                              exact
                              path={prop.path}
                              key={key}
                              render={(matchProps) =>
                                loggedIn !== true ? (
                                  <Redirect to="/admin" />
                                ) : (
                                  <prop.component />
                                )
                              }
                            />
                          );
                        })}
                        {<Route exact path="/not-found" component={NotFound} />}
                        {<Redirect to="/not-found" />}
                      </Switch>
                    </div>
                    {!loggedIn && <Footer links={guestRoutes} />}
                  </div>
                </ThemeProvider>
              </BrowserRouter>
            </ApolloProvider>
          </SnackbarProvider>
        </Provider>
      </div>
    );
  }
}

export default App;
