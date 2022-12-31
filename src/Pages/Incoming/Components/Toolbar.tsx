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
import { ArhiveType } from '../../../Types/dataIncoming';
export default function Toolbar() {
  const ArhiveTypeSelect = useAppSelector((state) => state.Stater.ArhiveType);
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
      <Can
        I={Action.Read}
        this={subject(Subject.DataIncoming, {
          arhive: [ArhiveType.ARHIVE, ArhiveType.ARHIVE_LAW_EXEC],
        })}
      >
        <>
          <ChangerArhiveType />
          <Can
            I={Action.Create}
            this={subject(Subject.DataIncoming, {
              arhive: [ArhiveType.ARHIVE, ArhiveType.ARHIVE_LAW_EXEC],
            })}
          >
            {lengthSelect > 0 && <AddArhive />}
          </Can>
          {ArhiveTypeSelect > 0 && lengthSelect > 0 && (
            <>
              <Can
                I={Action.Permit}
                this={subject(Subject.DataIncoming, {
                  arhive: [ArhiveTypeSelect],
                })}
              >
                <BoxArhive />
              </Can>
              <Can
                I={Action.Delete}
                this={subject(Subject.DataIncoming, {
                  arhive: [ArhiveTypeSelect],
                })}
              >
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
