const editionsStyle = (theme) => ({
  noEditions: {
    marginTop: theme.spacing(4),
  },
  noEditionText: {
    // color: theme.palette.white,
    marginTop: theme.spacing(20),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(8),
    backgroundColor: theme.palette.secondary.dark,
    "&:hover": {
      backgroundColor: "#3ae661",
    },
  },
  gridContainer: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  gridItem: {
    padding: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default editionsStyle;
