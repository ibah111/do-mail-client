import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid-premium';
import getAllow from '../../../hooks/getAllow';
import { useAppSelector } from '../../../Reducer';
import AddArhive from './AddArhive';
import ChangerArhiveType from './ChangerArhiveType';
import BoxArhive from './BoxArhive';
import ChangerMailType from './ChangerMailType';
import RemoveArhive from './RemoveArhive';

export default function Toolbar() {
  const isAllow = getAllow();
  const arhive = isAllow('arhive');
  const ArhiveType = useAppSelector((state) => state.Stater.ArhiveType);
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <ChangerMailType />
      {arhive && (
        <>
          <ChangerArhiveType />
          <AddArhive />
          {ArhiveType > 0 && (
            <>
              <BoxArhive />
              <RemoveArhive />
            </>
          )}
        </>
      )}
    </GridToolbarContainer>
  );
}
