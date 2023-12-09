import * as React from "react";
import Box from "@mui/material/Box";
// import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import { IoClose } from "react-icons/io5";

// export default function TransitionAlerts({
//   open,
//   setOpen,
// }: {
//   open: boolean;
//   setOpen: (open: boolean) => void;
// }) {
//   //   const [open, setOpen] = React.useState(true);

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Collapse in={open}>
//         <Alert
//           action={
//             <IconButton
//               aria-label="close"
//               color="inherit"
//               size="small"
//               onClick={() => {
//                 setOpen(!open);
//               }}
//             >
//               <IoClose fontSize="inherit" />
//             </IconButton>
//           }
//           sx={{ mb: 2 }}
//         >
//           Close me!
//         </Alert>
//       </Collapse>
//       <Button
//         disabled={open}
//         variant="outlined"
//         onClick={() => {
//           setOpen(open);
//         }}
//       >
//         Re-open
//       </Button>
//     </Box>
//   );
// }

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomizedSnackbars({
  open,
  setOpen,
  message,
  status,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
  status: "error" | "success" | "info" | "warning";
}) {
  // const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
}
