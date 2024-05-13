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
    headerName: 'Тип дела',
    field: 'doc_type',
    type: 'number',
    valueGetter(params) {
      /**
       * 1 - Исполнительный лист, 2 - Судебный приказ
       */
      const types = [
        {
          id: 1,
          val: 'Исполнительный лист',
        },
        {
          id: 2,
          val: 'Судебный приказ',
        },
      ];
      const value = params.row.doc_type;
      return types.filter((item) => {
        item.id === value;
      });
    },
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
