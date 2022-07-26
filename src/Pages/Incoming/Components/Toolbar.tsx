import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid-premium';
import getAllow from '../../../hooks/getAllow';
import { useAppSelector } from '../../../Reducer';
import AddArhive from './AddArhive';
import ChangerArhiveType from './ChangerArhiveType';
import BoxArhive from './BoxArhive';
import ChangerMailType from './ChangerMailType';
import RemoveArhive from './RemoveArhive';
import ReloadButton from './ReloadButton';

export default function Toolbar() {
  const isAllow = getAllow();
  const arhive = isAllow('arhive');
  const ArhiveType = useAppSelector((state) => state.Stater.ArhiveType);
  const lengthSelect = useAppSelector(
    (state) =>
      state.Model[state.Stater.MailType][state.Stater.ArhiveType].selectionModel
        .length,
  );
  return (
    <GridToolbarContainer>
      <ReloadButton />
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />

      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <ChangerMailType />
      {arhive && (
        <>
          <ChangerArhiveType />
          {lengthSelect > 0 && <AddArhive />}
          {ArhiveType > 0 && lengthSelect > 0 && (
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
