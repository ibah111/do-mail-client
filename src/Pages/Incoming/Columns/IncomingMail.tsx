import { Button } from '@mui/material';
import { GridColumns } from '@mui/x-data-grid-premium';
import { AllowFunction } from '../../../hooks/getAllow';
import { IncomingMailState } from '../../../Types/dataIncoming';
import { checkDateGrid } from '../../../utils/checkDate';

const IncomingMailColumns = (
  isAllow: AllowFunction,
): GridColumns<IncomingMailState> => [
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
  {
    field: 'kogda_otdano',
    headerName: 'Когда обработано',
    type: 'date',
  },
  { field: 'kto_obrabotal', headerName: 'Кто обработал' },
  { field: 'nal_skan', headerName: 'Скан', type: 'boolean' },
  {
    field: 'check_vsisk',
    headerName: 'Проверено взыскателем',
    type: 'boolean',
    editable: isAllow('collector'),
  },
  { field: 'check_vsisk_name', headerName: 'Кем проверено' },
  {
    field: 'task',
    headerName: 'Задача',
    width: 150,
    valueGetter: (params) => {
      if (params.row.id_zadach !== undefined && params.row.id_zadach !== null) {
        const userID = params.row.id_ispol_zadach;
        const ID = params.row.id_zadach;
        return `https://chat.nbkfinance.ru/company/personal/user/${userID}/tasks/task/view/${ID}/`;
      }
      return '';
    },
    renderCell: (params) =>
      params.value && (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          href={params.value}
          target="_blank"
        >
          Открыть задачу
        </Button>
      ),
  },
];
export default IncomingMailColumns;
