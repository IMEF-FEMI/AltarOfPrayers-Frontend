import React from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  dialogTitle: {
    backgroundColor: "grey",
    color: "black",
  },
  dialogContentText: {
    color: "black",
  },
});
function DeleteUserDialog(props) {
  const handleDelete = () => {
    props.handleDelete();
    props.handleClose();
  };
  const { classes } = props;
  return (
    <div>
      <DialogTitle className={classes.dialogTitle}>
        {"Confirm Delete?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.dialogContentText}>
          Are you sure You want To delete This {props.deleteText} ? This action
          cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>

        <Button onClick={() => handleDelete()} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </div>
  );
}

export default withStyles(styles)(DeleteUserDialog);
