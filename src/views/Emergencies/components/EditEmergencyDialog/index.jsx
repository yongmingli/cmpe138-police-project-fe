import React from "react";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton, Tooltip } from "@material-ui/core";
import { EditRounded } from "@material-ui/icons";
import { searchEmployee } from "services/user";

export default function EditEmergencyDialog({ onClose, emergency }) {
  const [open, setOpen] = React.useState(false);
  const [zipCode, setZipCode] = React.useState("");
  const [employees, setEmployees] = React.useState([]);
  const [leadResponder, setLeadResponder] = React.useState("");

  const submit = () => {
    const params = {
      emergency_id: emergency.emergency_id,
      zipcode: zipCode,
      lead_responder: leadResponder
    };
    setZipCode("");
    setLeadResponder("");
    setOpen(false);
    onClose(true, params);
  };

  const handleClose = () => {
    setZipCode("");
    setLeadResponder("");
    setOpen(false);
    onClose(false);
  };

  const handleZipCodeChange = event => {
    setZipCode(event.target.value);
  };

  const handleLeadResponderChange = async event => {
    if (event.target.value === "") {
      //setEmployees([]);
    } else {
      try {
        setLeadResponder(event.target.value);
        const { employees } = await searchEmployee({
          employee_name: event.target.value
        });
        console.log(employees);
        setEmployees(employees);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const canSubmit = () => {
    return !(zipCode.length > 0);
  };

  return (
    <div>
      <Tooltip title="Edit Emergency">
        <IconButton aria-label="edit emergency" onClick={() => setOpen(true)}>
          <EditRounded />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit an emergency</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              "To edit an emergency make changes to the form below and click submit."
            }
          </DialogContentText>
          <TextField
            margin="dense"
            id="zipCode"
            label="Zipcode"
            type="text"
            inputProps={{
              maxLength: 5
            }}
            value={zipCode}
            onChange={handleZipCodeChange}
            fullWidth
          />
          <Autocomplete
            id="search-lead"
            freeSolo
            disableOpenOnFocus
            options={employees}
            getOptionLabel={option =>
              `${option.fname} ${option.lname} - ${option.zipcode}`
            }
            renderOption={option => (
              <React.Fragment>
                <span>
                  {`${option.fname} ${option.lname} - ${option.zipcode}`}
                </span>
              </React.Fragment>
            )}
            renderInput={params => (
              <TextField
                {...params}
                label="Lead Responder"
                margin="normal"
                // variant="outlined"
                onChange={handleLeadResponderChange}
                fullWidth
              />
            )}
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
