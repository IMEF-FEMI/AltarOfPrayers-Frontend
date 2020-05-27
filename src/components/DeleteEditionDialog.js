import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import { Mutation } from "react-apollo";
import { deleteEdition } from "../graphql/query_mutation";
import { connect } from "react-redux";
import * as actions from "../redux";

const styles = (theme) => ({
  dialogTitle: {
    backgroundColor: "grey",
    color: "black",
  },
  dialogContentText: {
    color: "black",
  },
});
function DeleteEditionDialog(props) {
  const [name, setName] = React.useState("");
  const [valid, setValid] = React.useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDeleteEdition = (mutation) => {
    mutation();
    props.handleClose();
  };
  useEffect(() => {
    const valid = name === props.name;
    setValid(valid);
  }, [name, props.name]);
  
  const {classes} = props
  return (
    <div>
      <DialogTitle className={classes.dialogTitle}>{"Confirm Delete?"}</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.dialogContentText}>
          This action cannot be undone. This will permanently delete the{" "}
          {props.name} Edition Please type<b> {props.name} </b>to confirm.
        </DialogContentText>
        <TextField
          multiline
          autoFocus
          margin="dense"
          id="Name"
          type="text"
          value={name}
          onChange={handleNameChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Mutation
          mutation={deleteEdition}
          variables={{ editionId: props.editionId }}
          onError={(e) => {
            props.enqueNotification(e.message.split(":")[1], "error");
          }}
          update={(store) => {
            props.enqueNotification("Delete Successful", "success");
            props.updateStoreAfterEditionDelete(props.editionId);
          }}
        >
          {(deleteEdition) => (
            <Button
              disabled={!valid}
              onClick={() => handleDeleteEdition(deleteEdition)}
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
)(withStyles(styles)(DeleteEditionDialog));
