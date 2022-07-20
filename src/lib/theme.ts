import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, responsiveFontSizes } from '@mui/material';
import { ruRU } from '@mui/material/locale';
import { ruRU as ruRUGrid } from '@mui/x-data-grid-premium';
const theme = responsiveFontSizes(
  createTheme(
    {
      typography: {
        fontFamily: 'Roboto',
      },
    },
    ruRU,
    ruRUGrid,
  ),
);
export default theme;
