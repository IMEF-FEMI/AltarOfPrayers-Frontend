const editionStyle = (theme) => ({
  gridContainer: {
    marginTop: theme.spacing(5),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  buttonsContainer: {
    marginBottom: theme.spacing(5),
  },
  divider: {
    background: theme.palette.secondary.main,
    marginTop: theme.spacing(3),
    height: "3px",
  },
  dividerRetry: {
    background: '#1976d2',
    marginTop: theme.spacing(3),
    height: "3px",
  },
  retryText:{
    marginTop: theme.spacing(20),
    // color: theme.palette.white,
    marginBottom: theme.spacing(5),
  },
  gridItem: {
    padding: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPublish: {
    marginTop: theme.spacing(3),
    height: "50px",
    color: "white",
    "&:disabled": {
      color: "white",
      backgroundColor: "grey",
    },
    "&:focus": {
      backgroundColor: theme.palette.secondary.main,
    },
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
    "&:active": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  buttonRetry: {
    marginTop: theme.spacing(3),
    height: "50px",
    color: "white",
    "&:hover": {
      color: "white",
      backgroundColor: "#0a5196",
    },
    "&:active": {
      color: "white",
      backgroundColor: "#0a5196",
    },
    backgroundColor: '#1976d2',
    borderRadius: "50px",

  },
  buttonDelete: {
    marginTop: theme.spacing(3),
    height: "50px",
    backgroundColor: "#f44336",
    color: "white",
    "&:focus": {
      backgroundColor: "red",
    },
    "&:hover": {
      backgroundColor: "red",
    },
  },
});

export default editionStyle;
