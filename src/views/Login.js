import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import validate from "validate.js";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

import firebase from "firebase/app";
import "firebase/auth";

import ReactSpinner from "react-spinjs-fix";

import loginStyle from "../styles/loginStyle";

import { Google as GoogleIcon } from "../images/socialIcons";
import * as actions from "../redux";
import image from "../images/3.png";
import firebaseConfig from "../utils/firebaseConfig";

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128,
    },
  },
};

class Login extends Component {
  state = {
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    open: false,
    error: "",
  };

  componentDidMount() {
    const { values } = this.state;

    const errors = validate(values, schema);

    this.setState({
      ...this.state,
      isValid: errors ? false : true,
      errors: errors || {},
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { auth } = this.props;
    if (auth.isAuthenticated) {
      window.location.href = "/editions";
    }
    if (this.state.values !== prevState.values) {
      const { values } = this.state;

      const errors = validate(values, schema);

      this.setState({
        ...this.state,
        isValid: errors ? false : true,
        errors: errors || {},
      });
    }
  }
  handleChange = (event) => {
    const state = this.state;
    event.persist();

    this.setState({
      ...state,
      values: {
        ...state.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...state.touched,
        [event.target.name]: true,
      },
    });
  };
  handleSignIn = (event) => {
    const {
      // history,
      login,
    } = this.props;
    const state = this.state;

    event.preventDefault();
    // history.push("/");
    login({
      email: state.values.email,
      password: state.values.password,
      loginMethod: "classic",
    });
  };

  handleGoogleSignIn = (event) => {
    const {
      // history,
      login,
      setLoading,
      setError,
      enqueueSnackbar,
      closeSnackbar,
    } = this.props;

    event.preventDefault();
    // history.push("/");
    const provider = new firebase.auth.GoogleAuthProvider();
    setLoading(true);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        if (result.credential) {
          var user = result.user;
          if (user !== null) {
            login({
              email: user.providerData[0].email,
              password: "123456",
              loginMethod: "google",
            });
          }
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
        enqueueSnackbar({
          message: e.message,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "error",
            action: (key) => (
              <Button
                style={{ color: "#fff" }}
                onClick={() => closeSnackbar(key)}
              >
                dismiss
              </Button>
            ),
          },
        });
      });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    console.log("closing");

    this.setState({ open: false, error: "" });
  };
  render() {
    const { classes } = this.props;
    const state = this.state;
    const hasError = (field) =>
      state.touched[field] && state.errors[field] ? true : false;

    return (
      <div className={classes.root}>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          className={classes.modal}
          open={this.props.loading}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          disableEnforceFocus
          disableAutoFocus
        >
          <ReactSpinner />
        </Modal>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteContainer} item lg={5}>
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <img src={image} alt="website logo" />
              </div>
            </div>
          </Grid>
          <Grid className={classes.content} item align="center" lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentHeader}></div>
              <div className={classes.contentBody}>
                <form className={classes.form} onSubmit={this.handleSignIn}>
                  <Typography className={classes.title} variant="h2">
                    Sign in
                  </Typography>
                  <Grid className={classes.socialButtons} container>
                    <Grid item align="center"></Grid>
                  </Grid>
                  <Typography
                    align="center"
                    className={classes.sugestion}
                    color="textSecondary"
                    variant="body1"
                  >
                    Login with email address
                  </Typography>
                  <TextField
                    className={classes.textField}
                    error={
                      hasError("email") ? state.errors.email[0] : undefined
                    }
                    fullWidth
                    placeholder="Email address"
                    name="email"
                    onChange={this.handleChange}
                    type="text"
                    value={state.values.email || ""}
                    variant="standard"
                  />
                  <TextField
                    className={classes.textField}
                    fullWidth
                    error={
                      hasError("password")
                        ? state.errors.password[0]
                        : undefined
                    }
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    type="password"
                    value={state.values.password || ""}
                    variant="standard"
                  />

                  <Button
                    className={classes.signInButton}
                    color="primary"
                    disabled={!state.isValid}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                  <Button
                    onClick={this.handleGoogleSignIn}
                    size="large"
                    variant="contained"
                    fullWidth
                  >
                    <GoogleIcon className={classes.socialIcon} />
                    Login with Google
                  </Button>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.loading,
  error: state.error,
});
const mapActionToProps = (dispatch) => {
  return {
    login: (cred) => {
      dispatch(actions.login(cred));
    },
    setLoading: (payload) =>
      dispatch({ type: actions.LOADING, payload: payload }),
    setError: (error) => dispatch({ type: actions.SET_ERROR, payload: error }),
    enqueueSnackbar: (...args) => dispatch(actions.enqueueSnackbar(...args)),
    closeSnackbar: (...args) => dispatch(actions.closeSnackbar(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(withStyles(loginStyle)(Login)));
