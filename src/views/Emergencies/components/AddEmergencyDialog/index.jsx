import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

export default function AddEmergencyDialog({ onClose }) {
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [employeeType, setEmployeeType] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date("1988-01-01"));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const submit = () => {
    const params = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      phone: phone,
      type: employeeType,
      dob: selectedDate
    };
    setFirstName("");
    setLastName("");
    setUsername("");
    setPhone("");
    setEmployeeType("");
    setSelectedDate(new Date("1988-01-01"));
    setOpen(false);
    onClose(true, params);
  };

  const handleClose = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setPhone("");
    setEmployeeType("");
    setSelectedDate(new Date("1988-01-01"));
    setOpen(false);
    onClose(false);
  };

  const handleSelectEmployeeType = event => {
    setEmployeeType(event.target.value);
  };

  const handleFirstNameChange = event => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = event => {
    setLastName(event.target.value);
  };

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePhoneChange = event => {
    setPhone(event.target.value);
  };

  const canSubmit = () => {
    return !(selectedDate && username.length > 0 && firstName.length > 0 && lastName.length > 0 && employeeType.length > 0 && phone.length > 0);
  };

  return (
    <div>
      <Button color="primary" size="small" variant="outlined" onClick={handleClickOpen}>
        Add Employee
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create a new employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"To create a new employee, fill out the form below and submit. The employee will then be created with a default password."}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="fn"
            label="First Name"
            type="text"
            fullWidth
            onChange={handleFirstNameChange}
          />
          <TextField
            margin="dense"
            id="ln"
            label="Last Name"
            type="text"
            fullWidth
            onChange={handleLastNameChange}
          />
          <TextField
            margin="dense"
            id="un"
            label="Username"
            type="text"
            onChange={handleUsernameChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone"
            type="text"
            onChange={handlePhoneChange}
            fullWidth
          />
          <FormControl margin="dense"
                       fullWidth/*className={classes.formControl}*/>
            <InputLabel id="demo-simple-select-label">Employee Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={employeeType}
              onChange={handleSelectEmployeeType}
            >
              <MenuItem value={"ADMIN"}>Administrator</MenuItem>
              <MenuItem value={"CALL_OPERATOR"}>Call Operator</MenuItem>
              <MenuItem value={"POLICE_OFFICER"}>Police Officer</MenuItem>
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              variant="inline"
              format="yyyy/MM/dd"
              margin="dense"
              id="date-picker-inline"
              label="DOB"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} disabled={canSubmit()} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
