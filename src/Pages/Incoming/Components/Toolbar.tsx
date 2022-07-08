import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-premium";
import Arhive from "./Arhive";
import ChangerMode from "./ChangerMode";

export default function Toolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <ChangerMode />
      <Arhive />
    </GridToolbarContainer>
  );
}
