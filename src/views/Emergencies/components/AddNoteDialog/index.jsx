import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import "date-fns";
import React from "react";
import { CommentRounded } from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core";
import { createEmergencyNote } from "services/notes";

const AddNoteDialog = ({ onClose, emergency, user }) => {
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = React.useState("");

  const submit = async () => {
    const params = {
      employeeId: user.e_id,
      emergencyId: emergency.emergency_id,
      note: note
    };
    await createEmergencyNote(params);
    console.log(params);
    onClose(true);
    handleClose();
  };

  const handleClose = () => {
    setNote("");
    setOpen(false);
  };

  const handleNoteChange = event => {
    setNote(event.target.value);
  };

  const canSubmit = () => {
    return !(note.length > 0);
  };

  return (
    <div>
      <Tooltip title="Add Note">
        <IconButton
          aria-label="add note"
          onClick={() => {
            setOpen(true);
          }}
        >
          <CommentRounded />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"To add a new note fill out the form below and submit."}
          </DialogContentText>
          <TextField
            margin="dense"
            id="note"
            label="Note"
            type="text"
            onChange={handleNoteChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} disabled={canSubmit()} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNoteDialog;
