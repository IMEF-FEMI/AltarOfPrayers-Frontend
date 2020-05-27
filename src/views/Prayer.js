import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { getPrayer } from "../graphql/query_mutation";
import Modal from "@material-ui/core/Modal";
import ReactSpinner from "react-spinjs-fix";
import Backdrop from "@material-ui/core/Backdrop";
import * as actions from "../redux";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import prayerStyle from "../styles/prayerStyle";
import PrayerFields from "../components/PrayerFields";
import Dialog from "@material-ui/core/Dialog";
import DeletePrayerDialog from "../components/DeletePrayerDialog";

class Prayer extends Component {
  state = {
    open: false,
  };
  handleOpen = (data) => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  _getQueryVariables = () => {
    const { edition, month, day } = this.props.match.params;
    const editionId = parseInt(edition);
    const startingMonth = parseInt(month);
    const prayerDay = parseInt(day);
    return { editionId: editionId, day: prayerDay, month: startingMonth };
  };

  errorPage = (error) => {
    const { classes } = this.props;

    return (
      <div className="container">
        <Grid xs={12} item align="center">
          <Typography variant="h4" className={classes.errorText}>
            {error.message.split(":")[1]}
          </Typography>
        </Grid>
        <Divider className={classes.dividerError} />
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="delete-confirmation"
        >
          <DeletePrayerDialog
            handleClose={this.handleClose}
            _getQueryVariables={this._getQueryVariables}
          />
        </Dialog>
        <Query query={getPrayer} variables={this._getQueryVariables()}>
          {({ loading, error, data, refetch, networkStatus }) => {
            if (error) {
              this.props.setLoading(false);
              return this.errorPage(error);
            }
            if (data) {
              this.props.setLoading(false);

              return (
                <PrayerFields
                  classes={classes}
                  data={JSON.parse(data.prayer)}
                  _getQueryVariables={this._getQueryVariables}
                  setLoading={this.props.setLoading}
                  openDeletePrayerDialog={this.handleOpen}
                />
              );
            }
            if (loading) {
              this.props.setLoading(true);
              return (
                <Modal
                  aria-labelledby="prayer-page-title"
                  aria-describedby="prayer-page-description"
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
              );
            }
          }}
        </Query>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.loading,
});
const mapActionToProps = (dispatch) => {
  return {
    setLoading: (value) => dispatch(actions.setLoading(value)),
  };
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(withStyles(prayerStyle)(Prayer)));
