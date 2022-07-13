import { GridColumns } from '@mui/x-data-grid-premium';
import { AllowFunction } from '../../../hooks/getAllow';
import { ArhiveIncomingGovernmentMailState } from '../../../Types/dataIncoming';
import { checkDateGrid } from '../../../utils/checkDate';

const ArhiveIncomingGovernmentMailColumns = (
  isAllow: AllowFunction,
): GridColumns<ArhiveIncomingGovernmentMailState> => [
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
    editable: isAllow('editor'),
  },
  { field: 'check_vsisk_name', headerName: ' Кем проверено', type: 'string' },
  {
    field: 'ist',
    headerName: ' Истец, взыскатель',
    type: 'string',
    editable: isAllow('editor'),
  },
  {
    field: 'dateDoc',
    headerName: ' Дата вынесения документа',
    type: 'date',
    preProcessEditCellProps: checkDateGrid,
    editable: isAllow('editor'),
  },
  {
    field: 'ecp',
    headerName: ' ЕЦП',
    type: 'string',
    editable: isAllow('editor'),
  },
  {
    field: 'korob_arhive',
    headerName: ' Короб архива',
    type: 'number',
    editable: isAllow('editor', 'arhive'),
  },
  {
    field: 'data_obrabotki_arhive',
    headerName: ' Дата обработки архива',
    type: 'date',
  },
  {
    field: 'kto_obrabotal_arhive',
    headerName: ' Кто обработал архив',
  },
];
export default ArhiveIncomingGovernmentMailColumns;
