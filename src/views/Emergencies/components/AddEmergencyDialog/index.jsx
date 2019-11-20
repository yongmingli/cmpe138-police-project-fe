import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";
import "date-fns";

export default function AddEmergencyDialog({ onClose }) {
  const [open, setOpen] = React.useState(false);
  const [zipCode, setZipCode] = React.useState("");
  const [note, setNote] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(Date.now());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const submit = () => {
    const params = {
      zipCode: zipCode,
      startTime: selectedDate,
      note: note
    };
    setZipCode("");
    setNote("");
    setSelectedDate("");
    setOpen(false);
    onClose(true, params);
  };

  const handleClose = () => {
    setZipCode("");
    setNote("");
    setSelectedDate("");
    setOpen(false);
    onClose(false);
  };

  const handleZipCodeChange = event => {
    setZipCode(event.target.value);
  };

  const handleNoteChange = event => {
    setNote(event.target.value);
  };

  const canSubmit = () => {
    return !(zipCode.length > 0);
  };

  return (
    <div>
      <Button
        color="primary"
        size="small"
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add Emergency
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Report a new emergency</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"To report an emergency fill out the form below and click submit."}
          </DialogContentText>
          <TextField
            margin="dense"
            id="zipCode"
            label="Zipcode"
            type="text"
            onChange={handleZipCodeChange}
            fullWidth
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Emergency Start Time"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="notes"
            label="Description"
            multiline
            rows="4"
            value={note}
            onChange={handleNoteChange}
            margin="dense"
            variant="filled"
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
}
