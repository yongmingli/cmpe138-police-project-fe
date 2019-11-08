export default theme => ({
  root: {},
  field: {
    margin: theme.spacing(3)
  },
  textField: {
    width: "420px",
    maxWidth: "100%",
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  fieldError: {
    color: theme.palette.danger.main,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  portletFooter: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
});
