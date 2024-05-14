import { SnackbarProvider } from "notistack";

const SnackbarConfig = ({ children }) => (
  <SnackbarProvider
    maxSnack={1}
    anchorOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
  >
    {children}
  </SnackbarProvider>
);

export default SnackbarConfig;
