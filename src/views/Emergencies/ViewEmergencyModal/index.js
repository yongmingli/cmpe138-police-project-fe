import React from "react";

import {
  CircularProgress,
  IconButton,
  Modal,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tooltip,
  Button
} from "@material-ui/core";

import { VisibilityRounded, DoneRounded } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from "components";
import { getNotesForEmergency, resolveEmergency } from "services/emergency";

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "inline"
  },
  notes: {
    borderLeft: `1px solid ${theme.palette.border}`
  },
  progress: {
    display: "block",
    marginTop: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto"
  },
  button: {
    marginLeft: theme.spacing(1)
  },
  footer: {
    float: "right",
    marginLeft: "auto"
  },
  paper: {
    position: "absolute",
    width: 800,
    padding: theme.spacing(2, 4, 3),
    outline: "none"
  }
}));

const ViewEmergencyModal = ({ emergency, onClose }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [isLoading, setIsLoading] = React.useState(true);
  const [notes, setNotes] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const getNotes = async emergency => {
    console.log(emergency);
    const { emergency_id } = emergency;
    const { notes } = await getNotesForEmergency(emergency_id);
    console.log(notes);
    setIsLoading(false);
    setNotes(notes);
  };

  const handleResolveEmergency = async () => {
    const { emergency_id } = emergency;
    const res = await resolveEmergency(emergency_id);
    setOpen(false);
    onClose(true);
    console.log(res);
  };

  const renderNotes = () => {
    if (isLoading) {
      return <CircularProgress className={classes.progress} />;
    }
    if (notes.length === 0) {
      return <Typography variant="body2">No notes</Typography>;
    }

    return (
      <List className={classes.root}>
        {notes.map(note => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={`${note.employee.fname} ${note.employee.lname}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {`${note.employee.type}  -  `}
                    </Typography>
                    {note.note}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="fullWidth" component="li" />
          </>
        ))}
      </List>
    );
  };

  return (
    <div className={classes.root}>
      <Tooltip title="View Emergency">
        <IconButton
          aria-label="view emergency"
          onClick={() => {
            getNotes(emergency);
            setOpen(true);
            console.log("ViewEmergencyModal", emergency);
          }}
        >
          <VisibilityRounded />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        onEscapeKeyDown={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div style={modalStyle} className={classes.paper}>
          <Portlet>
            <PortletHeader>
              <PortletLabel title={`EMRG${emergency.emergency_id}`} />
            </PortletHeader>
            <PortletContent>
              <Grid container spacing={4}>
                <Grid item sm={4}>
                  <Typography variant="body2">
                    {`Zipcode: ${emergency.zipcode}`}
                  </Typography>
                  <Typography variant="body2">
                    {`Status: ${emergency.status}`}
                  </Typography>
                  <Typography variant="body2">
                    {`Started at: ${emergency.started_at}`}
                  </Typography>
                </Grid>
                <Grid item sm={8} className={classes.notes}>
                  {renderNotes()}
                </Grid>
              </Grid>
            </PortletContent>
            <PortletFooter>
              <div className={classes.footer}>
                {emergency.status !== "RESOLVED" ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DoneRounded />}
                    className={classes.button}
                    onClick={handleResolveEmergency}
                  >
                    Resolve Emergency
                  </Button>
                ) : null}
              </div>
            </PortletFooter>
          </Portlet>
        </div>
      </Modal>
    </div>
  );
};

export default ViewEmergencyModal;
