const contactStyle = (theme) => ({
  padding: {
    padding: theme.spacing.unit * 2,
  },
  button: {
    "&:focus": {
      backgroundColor: theme.palette.secondary.light,
    },
    marginTop: theme.spacing(2),
  },
});
export default contactStyle;
