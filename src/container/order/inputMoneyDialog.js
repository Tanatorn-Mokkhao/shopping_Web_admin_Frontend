import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Grid, Box, TextField, MenuItem } from "@mui/material";

function InputMoneyDialog({
  inputMonneyDialog,
  setInputMonneyDialog
}) {
  const handleCloseInputMonneyDialog = () => {
      setInputMonneyDialog({ status: false });
      setInputMoney("")
  };
    const [errorValidate, setErrorValidate] = useState({});
      const [inputMoney, setInputMoney] = useState("");

  let error = {};
  let formIsValid = true;

  const HandleValidation = () => {
    if (!inputMoney) {
      error = !error?.inputMoney ? { ...error, inputMoney: "ระบุ" } : error;
      formIsValid = false;
    }
    setErrorValidate(error);
  };

  const handleKeyDown = (e) => {
    if ((e.which !== 8 && e.which < 96) || e.which > 105) {
      e.preventDefault();
    }
  };

  const handleSave = () => {
    if (formIsValid) {
        HandleValidation();
        inputMonneyDialog.nextFunction(inputMoney)
        setInputMoney("")
    }
  };

  return (
    <div>
      <Dialog
        open={inputMonneyDialog.status}
        onClose={handleCloseInputMonneyDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
        style={{ zIndex: "998" }}
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          รับเงินมา
        </DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          <TextField
            error={errorValidate?.inputMoney ? true : false}
            label="จำนวนเงิน"
            value={inputMoney}
            onChange={(e) => setInputMoney(e.target.value)}
            helperText={
              errorValidate?.inputMoney ? errorValidate?.inputMoney : null
            }
            onKeyDown={handleKeyDown}
            style={{ marginTop: "20px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInputMonneyDialog}>Disagree</Button>
          <Button autoFocus onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InputMoneyDialog;
