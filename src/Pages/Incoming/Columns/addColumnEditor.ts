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
          value: 'Исполнительный лист',
        },
        {
          id: 2,
          value: 'Судебный приказ',
        },
      ];

      const doc_type_id = params.row.doc_type;
      if (doc_type_id) {
        const result = types.find((type) => type.id === doc_type_id);
        if (result) return result.value;
      }
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
