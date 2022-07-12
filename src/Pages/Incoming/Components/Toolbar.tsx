import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-premium";
import getAllow from "../../../hooks/getAllow";
import AddArhive from "./AddArhive";
import Arhive from "./Arhive";
import ChangerMode from "./ChangerMode";

export default function Toolbar() {
  const isAllow = getAllow();
  const arhive = isAllow("arhive");
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <ChangerMode />
      {arhive && (
        <>
          <Arhive />
          <AddArhive />
        </>
      )}
    </GridToolbarContainer>
  );
}
