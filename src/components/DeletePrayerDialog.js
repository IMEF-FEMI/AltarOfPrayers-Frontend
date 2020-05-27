import React from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles  from "@material-ui/core/styles/withStyles";
import { Mutation } from "react-apollo";
import { deletePrayer } from "../graphql/query_mutation";
import { connect } from "react-redux";
import * as actions from "../redux";


const styles = (theme) => ({
    dialogTitle:{
        backgroundColor: 'grey',
        color: 'black'
    },
    dialogContentText:{
        color: 'black'

    }
});
function DeletePrayerDialog(props) {
  const handleDeletePrayer = (mutation) => {
    mutation();
    props.handleClose();
  };
const {classes} = props
  return (
    <div>
      <DialogTitle className={classes.dialogTitle}>{"Confirm Delete?"}</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.dialogContentText}>
          Are you sure You want To delete? This action cannot be undone. And
          data will be lost
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Mutation
          mutation={deletePrayer}
          variables={props._getQueryVariables()}
          onError={(e) => {
            props.enqueNotification(e.message.split(":")[1], "error");
          }}
          update={(store) => {
            props.enqueNotification("Delete Successful", "success");
            window.location.href = `/editions/${
              props._getQueryVariables().editionId
            }`;
          }}
        >
          {(deletePrayer) => (
            <Button
              onClick={() => handleDeletePrayer(deletePrayer)}
              color="primary"
              autoFocus
            >
              Delete
            </Button>
          )}
        </Mutation>
      </DialogActions>
    </div>
  );
}
const mapActionToProps = (dispatch) => {
  return {
    enqueNotification: (message, variant) => {
      dispatch(
        actions.enqueueSnackbar({
          message: message,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: variant,
            action: (key) => (
              <Button
                style={{ color: "#fff" }}
                onClick={() => dispatch(actions.closeSnackbar(key))}
              >
                dismiss
              </Button>
            ),
          },
        })
      );
    },
  };
};

export default connect(
  null,
  mapActionToProps
)(withStyles(styles)(DeletePrayerDialog));
