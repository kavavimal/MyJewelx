import { enqueueSnackbar } from "notistack";

export const notify = ({
  message,
  variant = "default",
  preventDuplicate = true,
}) => {
  enqueueSnackbar(message, {
    variant: variant,
    preventDuplicate: preventDuplicate,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    autoHideDuration: 3000,
  });
};
