import { Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid-premium';
import { AllowFunction } from '../../../hooks/getAllow';
import { ArhiveIncomingCourtMailState } from '../../../Types/dataIncoming';
import { checkDateGrid } from '../../../utils/checkDate';

const ArhiveIncomingCourtMailColumns = (isAllow: AllowFunction) => {
  const data: GridColDef<ArhiveIncomingCourtMailState>[] = [
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
      field: 'doc_name_arhive',
      headerName: ' Название документа',
      type: 'string',
      editable: isAllow('editor', 'arhive'),
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
      field: 'adres',
      headerName: ' Откуда',
      type: 'string',
      editable: isAllow('editor', 'arhive'),
    },
    {
      field: 'mail',
      headerName: ' На какую почту',
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
      type: 'number',
      editable: true,
    });
    data.push({
      field: 'id_zadach',
      headerName: 'ID задачи',
      type: 'number',
      editable: true,
    });
    data.push({
      field: 'id_ispol_zadach',
      headerName: 'ID исполнителя задач',
      type: 'number',
      editable: true,
    });
  }
  return data;
};
export default ArhiveIncomingCourtMailColumns;
