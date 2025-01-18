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
import MultiEdit from './MultiEdit/MultiEdit';
import { Button } from '@mui/material';
import { DataGridEvents, DataGridEventsEnum } from '../DataGrid';

interface ToolbarInterface {
  DialogTarget: EventTarget;
}

export default function Toolbar({ DialogTarget }: ToolbarInterface) {
  const ArhiveTypeSelect = useAppSelector((state) => state.Stater.ArhiveType);
  const MailTypeSelect = useAppSelector((state) => state.Stater.MailType);
  const lengthSelect = useAppSelector(
    (state) =>
      state.Model[state.Stater.MailType][state.Stater.ArhiveType].selectionModel
        .length,
  );
  const ids = useAppSelector(
    (state) =>
      state.Model[state.Stater.MailType][state.Stater.ArhiveType]
        .selectionModel,
  ) as number[];
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
          mode: [MailTypeSelect],
          arhive: [ArhiveType.ARHIVE, ArhiveType.ARHIVE_LAW_EXEC],
        })}
      >
        <>
          <ChangerArhiveType />
          <Can
            I={Action.Create}
            this={subject(Subject.DataIncoming, {
              mode: [MailTypeSelect],
              arhive: [ArhiveType.ARHIVE, ArhiveType.ARHIVE_LAW_EXEC],
            })}
          >
            {lengthSelect > 0 && <AddArhive mail={MailTypeSelect} />}
          </Can>
          {ArhiveTypeSelect > 0 && lengthSelect > 0 && (
            <>
              <Can
                I={Action.Permit}
                this={subject(Subject.DataIncoming, {
                  mode: [MailTypeSelect],
                  arhive: [ArhiveTypeSelect],
                })}
              >
                <BoxArhive />
              </Can>
              <Can
                I={Action.Delete}
                this={subject(Subject.DataIncoming, {
                  mode: [MailTypeSelect],
                  arhive: [ArhiveTypeSelect],
                })}
              >
                <RemoveArhive />
              </Can>
            </>
          )}
        </>
      </Can>
      <Can
        I={Action.Delete}
        this={subject(Subject.DataIncoming, { mode: [MailTypeSelect] })}
      >
        <Button
          size="small"
          variant="outlined"
          onClick={() =>
            DialogTarget.dispatchEvent(
              new DataGridEvents(DataGridEventsEnum.OpenCreateUnknownDialog),
            )
          }
        >
          Создать неопознанное
        </Button>
      </Can>
      {lengthSelect > 0 && (
        <Can
          I={Action.Delete}
          this={subject(Subject.DataIncoming, { mode: [MailTypeSelect] })}
        >
          <Button
            color="warning"
            variant="contained"
            size="small"
            onClick={() => {
              DialogTarget.dispatchEvent(
                new DataGridEvents(DataGridEventsEnum.OpenMultiEditDialog, ids),
              );
            }}
          >
            {'Ред.'}
          </Button>
          <Can
            I={Action.Delete}
            this={subject(Subject.DataIncoming, { mode: [MailTypeSelect] })}
          >
            <Remove />
          </Can>
        </Can>
      )}
    </GridToolbarContainer>
  );
}
