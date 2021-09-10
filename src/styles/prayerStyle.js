const prayerStyle = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    marginTop: theme.spacing(20),
    // color: theme.palette.white,
    marginBottom: theme.spacing(5),
  },
  dividerError: {
    background: "#1976d2",
    marginTop: theme.spacing(3),
    height: "3px",
  },
  gridContainer: {
    marginTop: theme.spacing(5),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  formRoot: {
    display: "flex",
    flexWrap: "wrap",
  },

  multilineColor: {
    // color: 'black',
    margin: theme.spacing(1),
    // "& .MuiFilledInput-root": {
    //   backgroundColor: theme.palette.white,
    // },
    // "& .MuiFilledInput-root-disabled": {
    //   backgroundColor: 'black',
    // },
    // "& .MuiOutlinedInput-root": {
    //   backgroundColor: theme.palette.white,
    // },
    // "& label.Mui-focused": {
    //   color: theme.palette.white,
    // },
    // "& .MuiInputBase-root.Mui-disabled": {
    //   color: 'black',
    // },
    // "& .MuiInput-underline:after": {
    //   borderBottomColor: theme.palette.white,
    // },
    // "& .MuiOutlinedInput-root": {
    //   "& fieldset": {
    //     borderColor: theme.palette.white,
    //   },
    //   "&:hover fieldset": {
    //     borderColor: theme.palette.white,
    //   },
    //   "&.Mui-focused fieldset": {
    //     borderColor: theme.palette.white,
    //   },
    // },
  },

  buttonsContainer: {
    marginBottom: theme.spacing(5),
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
  buttonAdd: {
    marginTop: theme.spacing(3),
    height: "50px",
    color: "white",
    backgroundColor: theme.palette.secondary.main,
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
  adormentIcon: {
    cursor: "pointer",
    color: 'black',
    marginBottom: theme.spacing(2),

  },
  prayerNumber: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.white,
    marginTop: theme.spacing(4),
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  addPrayerIcon: {
    cursor: "pointer",
    color: theme.palette.primary.dark,
    marginTop: theme.spacing(2.5),
    marginLeft: theme.spacing(2.5),
    "&:active": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
});

export default prayerStyle;
