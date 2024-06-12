import { enqueueSnackbar } from "notistack";

export const notify = ({
  message,
  variant = "default",
  preventDuplicate = true,
}) => {
  return enqueueSnackbar(message, {
    variant: variant,
    preventDuplicate: preventDuplicate,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    autoHideDuration: 3000,
    style: {
      background: "white",
      color: "black",
      borderRadius: ".5rem",
      boxShadow:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      padding: "0 4px",
    },
  });
};
