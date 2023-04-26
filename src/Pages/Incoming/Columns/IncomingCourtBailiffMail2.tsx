import { Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid-premium';
import { AllowFunction } from '../../../hooks/getAllow';
import { ArhiveType, DataIncomingType } from '../../../Types/dataIncoming';
import { checkDateGrid } from '../../../utils/checkDate';
import addColumnArhive from './addColumnArhive';
import addColumnEditor from './addColumnEditor';

export default function IncomingCourtBailiffMailColumns2<
  K extends DataIncomingType['IncomingCourtBailiffMail2'][T],
  T extends ArhiveType,
>(isAllow: AllowFunction, arhive?: T): GridColDef<K>[] {
  const data: GridColDef<K>[] = [
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
    {
      field: 'reestr',
      headerName: ' Реестр',
      type: 'string',
      editable: isAllow('editor'),
    },
    {
      field: 'doc_name',
      headerName: ' Название документа',
      type: 'string',
      editable: isAllow('editor'),
    },
    {
      field: 'gd',
      headerName: ' ГД - Гражданское дело',
      type: 'string',
      editable: isAllow('editor'),
    },
    {
      field: 'fio_dol',
      headerName: ' ФИО должника',
      type: 'string',
      editable: isAllow('editor'),
    },
    {
      field: 'ispol_zadach',
      headerName: ' Исполнитель задачи',
      type: 'string',
      editable: isAllow('editor'),
    },
    {
      field: 'vsisk',
      headerName: ' ФИО взыскателя',
      type: 'string',
      editable: isAllow('editor'),
    },
    { field: 'kogda_otdano', headerName: ' Когда обработано', type: 'date' },
    { field: 'kto_obrabotal', headerName: ' Кто обработал', type: 'string' },
    {
      field: 'check_vsisk',
      headerName: ' Проверено взыскателем',
      type: 'boolean',
      editable: isAllow('collector'),
    },
    { field: 'check_vsisk_name', headerName: ' Кем проверено', type: 'string' },
    {
      field: 'task',
      headerName: 'Задача',
      width: 150,
      valueGetter: (params) => {
        if (
          params.row.id_zadach !== undefined &&
          params.row.id_zadach !== null
        ) {
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
  addColumnArhive(data, isAllow, arhive);
  addColumnEditor(data, isAllow);
  return data;
}
