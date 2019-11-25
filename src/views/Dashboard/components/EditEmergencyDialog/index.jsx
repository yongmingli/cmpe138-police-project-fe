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
import { searchEmployee } from "../../../../services/user";

export default function EditEmergencyDialog({ onClose, emergency }) {
  const [open, setOpen] = React.useState(false);
  const [zipCode, setZipCode] = React.useState(emergency.zipcode);
  const [employees, setEmployees] = React.useState([]);
  const [selectedLead, setSelectedLead] = React.useState({});

  const submit = () => {
    const params = {
      emergency_id: emergency.emergency_id,
      zipcode: zipCode,
      lead_responder: selectedLead
    };
    setZipCode("");
    setOpen(false);
    console.log(params);
    onClose(true, params);
  };

  const handleClose = () => {
    setZipCode("");
    setOpen(false);
    onClose(false);
  };

  const handleZipCodeChange = event => {
    setZipCode(event.target.value);
  };

  const handleLeadResponderChange = async (event) => {
      try {
        const { employees } = await searchEmployee({
          q: event ? event.target.value : "",
          type: "POLICE_OFFICER",
          zip: zipCode
        });
        setEmployees(employees);
      } catch (e) {
        console.log(e);
      }

  };

  const canSubmit = () => {
    return !(zipCode.length > 0);
  };

  return (
    <div>
      <Tooltip title="Edit Emergency">
        <IconButton aria-label="edit emergency" onClick={() => {handleLeadResponderChange(); setOpen(true)}}>
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
              "To edit an emergency make changes to the form below and click submit. A zip code is required before searching."
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
            options={employees}
            getOptionLabel={option => `${option.fname} ${option.lname}, ${option.username} - ${option.zipcode}`}
            noOptionsText={"No officers found."}
            onChange={(event, value) => setSelectedLead(value)}
            renderInput={params => (
              <TextField
                {...params}
                label="Lead Responder"
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
