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
import { AddRounded } from "@material-ui/icons";
import { searchEmployee } from "../../../../services/user";

export default function AddResponderDialog({ onClose, emergency }) {
  const [open, setOpen] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const [selectedLead, setSelectedLead] = React.useState({});

  const submit = () => {
    const params = {
      emergency_id: emergency.emergency_id,
      responder: selectedLead
    };
    setOpen(false);
    onClose(true, params);
  };

  const handleClose = () => {
    setOpen(false);
    onClose(false);
  };

  const handleLeadResponderChange = async (event) => {
      try {
        const { employees } = await searchEmployee({
          q: event ? event.target.value : "",
          type: "POLICE_OFFICER",
          zip: emergency.zipcode
        });
        setEmployees(employees);
      } catch (e) {
        console.log(e);
      }

  };

  const canSubmit = () => {
    return !(selectedLead && selectedLead.e_id);
  };

  return (
    <div>
      <Tooltip title="Add Responder">
        <IconButton aria-label="add responder" onClick={() => {handleLeadResponderChange(); setOpen(true);}}>
          <AddRounded />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a responder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              "To add a responder please search for an officer below."
            }
          </DialogContentText>
          <Autocomplete
            id="search-lead"
            freeSolo
            options={employees}
            getOptionLabel={option => `${option.fname} ${option.lname}, ${option.username} - ${option.zipcode}`}
            noOptionsText={"No officers found."}
            onChange={(event, value) => setSelectedLead(value)}
            renderInput={params => (
              <TextField
                {...params}
                label="Responder"
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
