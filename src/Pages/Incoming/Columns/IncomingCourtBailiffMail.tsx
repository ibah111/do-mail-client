import { Button } from '@mui/material';
import { GridColumns } from '@mui/x-data-grid-premium';
import { AllowFunction } from '../../../hooks/getAllow';
import { IncomingCourtBailiffMailState } from '../../../Types/dataIncoming';
import { checkDateGrid } from '../../../utils/checkDate';

const IncomingCourtBailiffMailColumns = (isAllow: AllowFunction) => {
  const data: GridColumns<IncomingCourtBailiffMailState> = [
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
  if (isAllow('editor')) {
    data.push({
      field: 'id_dela',
      headerName: 'ID дела',
      editable: true,
    });
    data.push({
      field: 'id_zadach',
      headerName: 'ID задачи',
      editable: true,
    });
    data.push({
      field: 'id_ispol_zadach',
      headerName: 'ID исполнителя задач',
      editable: true,
    });
  }
  return data;
};
export default IncomingCourtBailiffMailColumns;
