const landingStyle = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#282c34",
    paddingBottom: theme.spacing(15),
  },
  heading: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.secondary.dark,
    // marginTop: theme.spacing(10),
    fontWeight: "300",
    fontSize: "6rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "3rem",
      marginTop: theme.spacing(3),
    },
  },
  storeButtons: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(2),
    maxWidth: "100%",
  },
  body: {
    paddingLeft: theme.spacing(2),
    color: theme.palette.primary.light,
    fontFamily: ["Nunito Sans", "sans-serif"],
  },
  image: {
    // width: window.innerWidth * 0.3,
    // height: window.innerHeight * 0.6,
    borderRadius: 15,
    marginTop: theme.spacing(2),
  },
  appMain:{

  },
  intro:{},
  tagLine:{}
});

export default landingStyle;
