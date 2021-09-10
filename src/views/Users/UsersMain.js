import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten } from "@material-ui/core/styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { connect } from "react-redux";
import * as actions from "../../redux";
import moment from "moment";
import DeleteDialog from "../../components/DeleteDialog";

const headCells = [
  { id: "Name", align: "left", disablePadding: true, label: "Name" },
  { id: "Email", align: "center", disablePadding: false, label: "Email" },
  {
    id: "Date Registered",
    align: "center",
    disablePadding: false,
    label: "Date Registered",
  },
  { id: "Admin", align: "right", disablePadding: false, label: "Admin" },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={true}
            inputProps={{ "aria-label": "select all users" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  margin: theme.spacing(1),
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 50%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { selected } = props;
  const isEmpty =
    Object.keys(selected).length === 0 && selected.constructor === Object;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: !isEmpty,
      })}
    >
      {!isEmpty ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selected.fullname} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Users
        </Typography>
      )}

      {!isEmpty ? (
        <Grid item>
          <Button
            variant="outlined"
            size="small"
            color={selected.admin ? "secondary" : "primary"}
            className={classes.margin}
            disabled={props.user.email === selected.email}
            onClick={() => {
              selected.admin
                ? props.removeAdmin({ email: selected.email })
                : props.makeAdmin({ email: selected.email });
            }}
          >
            {selected.admin ? "Remove Admin" : "Make Admin"}
          </Button>
          {/* <Tooltip title="Delete">
            <span>
              <IconButton
                aria-label="delete"
                className={classes.margin}
                disabled={props.user.email === selected.email}
                onClick={props.handleOpen}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip> */}
        </Grid>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  selected: PropTypes.object.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function UsersMain(props) {
  const { rowsPerPage, userList, userCount } = props.users;
  const { fetchUsers, setCount } = props;
  const classes = useStyles();
  const [selected, setSelected] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    async function fetchData() {
      if (userList.length === 0) {
        await fetchUsers({ first: 10 });
        await setCount();
      }
    }
    fetchData();
  }, [userList, fetchUsers, setCount]);

  const handleOpen = (data) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (event, row) => {
    if (row === selected) {
      return setSelected({});
    }
    setSelected(row);
  };
  const handleChangePage = async (event, newPage) => {
    if (userList.length < (newPage + 1) * rowsPerPage)
      await props.fetchUsers({
        first: rowsPerPage,
        skip: (newPage + 1) * rowsPerPage,
      });
    setPage(newPage);
  };

  const isSelected = (id) => selected.id === id;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, userList.length - page * rowsPerPage);
  const makeAdmin = (variables) => {
    props.makeAdmin(variables);
  };
  const removeAdmin = (variables) => {
    props.removeAdmin(variables);
  };

  const deleteUser = () => {
    props.deleteUser({ email: selected.email });
  };

  return (
    <div className="container">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-confirmation"
      >
        <DeleteDialog
          handleDelete={deleteUser}
          handleClose={handleClose}
          deleteText={"User"}
        />
      </Dialog>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            user={props.auth.user}
            selected={selected}
            makeAdmin={makeAdmin}
            removeAdmin={removeAdmin}
            handleOpen={handleOpen}
          />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={"medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                selectedName={selected.fullname}
                rowCount={userCount}
              />
              <TableBody>
                {userList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.fullname}
                        </TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">
                          {moment(row.createdAt).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell align="right">
                          {row.admin ? "Yes" : "No"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={userCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
          />
        </Paper>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});
const mapActionsToProps = (dispatch) => {
  return {
    fetchUsers: (variables) => dispatch(actions.loadUsers(variables)),
    setCount: () => dispatch(actions.setUsersCount()),
    makeAdmin: (variables) => dispatch(actions.makeUserAdmin(variables)),
    removeAdmin: (variables) => dispatch(actions.removeUserAdmin(variables)),
    deleteUser: (variables) => dispatch(actions.removeUser(variables)),
  };
};
export default connect(mapStateToProps, mapActionsToProps)(UsersMain);
