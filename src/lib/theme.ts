import { createTheme, responsiveFontSizes } from "@mui/material";
import { ruRU } from "@mui/material/locale";
import { ruRU as ruRUGrid } from "@mui/x-data-grid-premium";
const theme = responsiveFontSizes(
  createTheme(
    {
      typography: {
        fontFamily: "Roboto",
      },
    },
    ruRU,
    ruRUGrid
  )
);
export default theme;
