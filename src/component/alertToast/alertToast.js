import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

function AlertToast(props) {
  const [alertToast, setAlertToast] = React.useState(true);

  let alert = null;    
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setAlertToast(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  switch (props.type) {
    case "show":
      alert = (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alertToast}
          onClose={() => setAlertToast(false)}
        >
          <Alert severity="error" action={action}>
            {props.message || "มีข้อผิดพลาด"}
          </Alert>
        </Snackbar>
      );
      break;
    default:
      break;
  }

  return alert;
}

export default AlertToast;
