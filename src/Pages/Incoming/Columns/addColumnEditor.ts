import { GridColDef } from '@mui/x-data-grid-premium';
import { AllowFunction } from '../../../hooks/getAllow';
import {
  ArhiveType,
  DataIncomingType,
  MailType,
} from '../../../Types/dataIncoming';

export default function addColumnEditor<
  K extends DataIncomingType[MailType][ArhiveType],
>(data: GridColDef<K>[], isAllow: AllowFunction) {
  data.push({
    field: 'id_dela',
    headerName: 'ID дела',
    type: 'number',
    editable: isAllow('editor'),
  });
  data.push({
    field: 'id_zadach',
    headerName: 'ID задачи',
    type: 'number',
    editable: isAllow('editor'),
  });
  data.push({
    field: 'id_ispol_zadach',
    headerName: 'ID исполнителя задач',
    type: 'number',
    editable: isAllow('editor'),
  });
}
