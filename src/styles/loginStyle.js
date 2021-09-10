const loginStyles = (theme) => ({
  root: {
    height: "100%",
  },
  grid: {
    height: "100%",
    
  },
  quoteContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    color: theme.palette.secondary.dark
  },
  quote: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.dark,
    backgroundImage: require("../images/1.png"),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px",
  },
  quoteText: {
    // color: theme.palette.white,
    fontWeight: 300,
  },
  name: {
    marginTop: theme.spacing(3),
    // color: theme.palette.white,
  },
  bio: {
    // color: theme.palette.white,
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    // backgroundColor: theme.palette.white,
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
    // color: theme.palette.white,
  },
  socialButtons: {
    marginTop: theme.spacing(3),
  },
  socialIcon: {
    marginRight: theme.spacing(1),
    color: "red",
  },
  sugestion: {
    marginTop: theme.spacing(2),
    // color: theme.palette.white,
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default loginStyles;
