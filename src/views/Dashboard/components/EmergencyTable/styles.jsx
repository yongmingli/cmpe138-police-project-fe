export default theme => ({
  root: {
    marginTop: "20px"
  },
  tableRow: {
    height: "64px"
  },
  tableCell: {
    whiteSpace: "nowrap"
  },
  tableCellInner: {
    display: "flex",
    alignItems: "center"
  },
  nameText: {
    display: "inline-block",
    marginLeft: theme.spacing(2),
    fontWeight: 500,
    cursor: "pointer"
  }
});
