import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  createTheme as createThemeOrigin,
  PaletteMode,
  responsiveFontSizes,
} from '@mui/material';
import { ruRU } from '@mui/material/locale';
import { ruRU as ruRUGrid } from '@mui/x-data-grid-premium';
export function createTheme(mode?: PaletteMode) {
  return responsiveFontSizes(
    createThemeOrigin(
      {
        palette: { mode },
        typography: {
          fontFamily: 'Roboto',
        },
      },
      ruRU,
      ruRUGrid,
    ),
  );
}
