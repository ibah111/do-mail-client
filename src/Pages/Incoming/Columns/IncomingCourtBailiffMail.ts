import { GridColumns } from '@mui/x-data-grid-premium';
import { AllowFunction } from '../../../hooks/getAllow';
import { IncomingCourtBailiffMailState } from '../../../Types/dataIncoming';
import { checkDateGrid } from '../../../utils/checkDate';

const IncomingCourtBailiffMailColumns = (
  isAllow: AllowFunction,
): GridColumns<IncomingCourtBailiffMailState> => [
  { field: 'id', headerName: ' ID записи', type: 'number' },
  {
    field: 'date_post',
    headerName: ' Дата поступления',
    type: 'date',
    preProcessEditCellProps: checkDateGrid,
    editable: isAllow('editor'),
  },
  {
    field: 'otprav',
    headerName: ' Отправитель',
    type: 'string',
    editable: isAllow('editor'),
  },
  { field: 'reestr', headerName: ' Реестр', type: 'string' },
  {
    field: 'doc_name',
    headerName: ' Название документа',
    type: 'string',
    editable: isAllow('editor'),
  },
  { field: 'gd', headerName: ' ГД - Гражданское дело', type: 'string' },
  { field: 'fio_dol', headerName: ' ФИО должника', type: 'string' },
  {
    field: 'ispol_zadach',
    headerName: ' Исполнитель задачи',
    type: 'string',
  },
  { field: 'vsisk', headerName: ' ФИО взыскателя', type: 'string' },
  { field: 'kogda_otdano', headerName: ' Когда обработано', type: 'date' },
  { field: 'kto_obrabotal', headerName: ' Кто обработал', type: 'string' },
  {
    field: 'check_vsisk',
    headerName: ' Проверено взыскателем',
    type: 'boolean',
    editable: isAllow('collector'),
  },
  { field: 'check_vsisk_name', headerName: ' Кем проверено', type: 'string' },
];
export default IncomingCourtBailiffMailColumns;
