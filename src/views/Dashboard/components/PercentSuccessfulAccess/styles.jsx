export default theme => ({
  root: {
    backgroundColor: theme.palette.success.main,
    borderColor: theme.palette.success.main,
    padding: theme.spacing(3)
  },
  content: {
    display: "flex",
    alignItems: "center"
  },
  details: {},
  title: {
    fontWeight: 700,
    color: theme.palette.common.white
  },
  value: {
    color: theme.palette.common.white
  },
  iconWrapper: {
    alignItems: "center",
    backgroundColor: theme.palette.common.white,
    borderRadius: "50%",
    display: "inline-flex",
    height: "4rem",
    justifyContent: "center",
    marginLeft: "auto",
    width: "4rem"
  },
  icon: {
    color: theme.palette.success.main,
    width: "2rem",
    height: "2rem",
    fontSize: "2rem"
  },

  footer: {
    marginTop: theme.spacing(3)
  },
  barColorPrimary: {}
});
