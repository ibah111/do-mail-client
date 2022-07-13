import { GridColumns } from '@mui/x-data-grid-premium';
import { AllowFunction } from '../../../hooks/getAllow';
import { ArhiveIncomingMailState } from '../../../Types/dataIncoming';
import { checkDateGrid } from '../../../utils/checkDate';

const ArhiveIncomingMailColumns = (
  isAllow: AllowFunction,
): GridColumns<ArhiveIncomingMailState> => [
  { field: 'id', headerName: 'ID', type: 'number' },
  {
    field: 'date_post',
    headerName: 'Дата поступления',
    type: 'date',
    preProcessEditCellProps: checkDateGrid,
    editable: isAllow('editor'),
  },
  {
    field: 'convert',
    headerName: 'Учет конвертов',
    type: 'boolean',
    editable: isAllow('editor'),
  },
  {
    field: 'pristavi',
    headerName: 'Приставы',
    type: 'boolean',
    editable: isAllow('editor'),
  },
  {
    field: 'adr_otp',
    headerName: 'Адрес отправителя',
    editable: isAllow('editor'),
  },
  { field: 'otprav', headerName: 'Отправитель', editable: isAllow('editor') },
  { field: 'reestr', headerName: 'Реестр' },
  {
    field: 'doc_name',
    headerName: 'Название документа',
    editable: isAllow('editor'),
  },
  {
    field: 'st_pnkt',
    headerName: 'Статья и пункт',
    editable: isAllow('editor'),
  },
  { field: 'gd', headerName: 'ГД - Гражданское дело' },
  { field: 'fio_dol', headerName: 'ФИО должника' },
  { field: 'kd', headerName: 'КД - Кредитный договор' },
  { field: 'ispol_zadach', headerName: 'Исполнитель задачи' },
  { field: 'vsisk', headerName: 'ФИО взыскателя' },
  { field: 'kogda_otdano', headerName: 'Когда обработано', type: 'date' },
  { field: 'kto_obrabotal', headerName: 'Кто обработал' },
  { field: 'nal_skan', headerName: 'Скан', type: 'boolean' },
  {
    field: 'check_vsisk',
    headerName: 'Проверено взыскателем',
    type: 'boolean',
    editable: isAllow('editor'),
  },
  { field: 'check_vsisk_name', headerName: 'Кем проверено' },
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
export default ArhiveIncomingMailColumns;
