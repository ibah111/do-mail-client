import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid-premium';
import { useAppSelector } from '../../../Reducer';
import AddArhive from './AddArhive';
import ChangerArhiveType from './ChangerArhiveType';
import BoxArhive from './BoxArhive';
import ChangerMailType from './ChangerMailType';
import RemoveArhive from './RemoveArhive';
import ReloadButton from './ReloadButton';
import Remove from './Remove';
import { Can } from '../../../Context/Ability';
import { Action, Subject } from '../../../casl/casl.factory';
import { subject } from '@casl/ability';
const SubjectArhive = subject(Subject.DataIncoming, {
  arhive: true,
  arhive_id: true,
});
export default function Toolbar() {
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
      <Can I={Action.Read} this={SubjectArhive}>
        <>
          <ChangerArhiveType />
          <Can I={Action.Create} this={SubjectArhive}>
            {lengthSelect > 0 && <AddArhive />}
          </Can>
          {ArhiveType > 0 && lengthSelect > 0 && (
            <>
              <Can I={Action.Permit} this={SubjectArhive}>
                <BoxArhive />
              </Can>
              <Can I={Action.Delete} this={SubjectArhive}>
                <RemoveArhive />
              </Can>
            </>
          )}
        </>
      </Can>
      <Can I={Action.Delete} a={Subject.DataIncoming}>
        <Remove />
      </Can>
    </GridToolbarContainer>
  );
}
