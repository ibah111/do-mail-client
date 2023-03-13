import { Button } from '@mui/material';
import { GridColumns } from '@mui/x-data-grid-premium';
import { AllowFunction } from '../../../hooks/getAllow';
import { ArhiveIncomingMailState } from '../../../Types/dataIncoming';
import { checkDateGrid } from '../../../utils/checkDate';

const ArhiveIncomingMailColumns = (isAllow: AllowFunction) => {
  const data: GridColumns<ArhiveIncomingMailState> = [
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
    { field: 'reestr', headerName: 'Реестр', editable: isAllow('editor') },
    {
      field: 'doc_name_arhive',
      headerName: 'Название документа',
      editable: isAllow('editor', 'arhive'),
      valueGetter: (params) =>
        params.value ? params.value : params.row.doc_name,
    },
    {
      field: 'st_pnkt',
      headerName: 'Статья и пункт',
      editable: isAllow('editor'),
    },
    {
      field: 'gd',
      headerName: 'ГД - Гражданское дело',
      editable: isAllow('editor'),
    },
    {
      field: 'fio_dol',
      headerName: 'ФИО должника',
      editable: isAllow('editor'),
    },
    {
      field: 'kd',
      headerName: 'КД - Кредитный договор',
      editable: isAllow('editor'),
    },
    {
      field: 'ispol_zadach',
      headerName: 'Исполнитель задачи',
      editable: isAllow('editor'),
    },
    {
      field: 'vsisk',
      headerName: 'ФИО взыскателя',
      editable: isAllow('editor'),
    },
    { field: 'kogda_otdano', headerName: 'Когда обработано', type: 'date' },
    { field: 'kto_obrabotal', headerName: 'Кто обработал' },
    {
      field: 'nal_skan',
      headerName: 'Скан',
      type: 'boolean',
      editable: isAllow('editor'),
    },
    {
      field: 'check_vsisk',
      headerName: 'Проверено взыскателем',
      type: 'boolean',
      editable: isAllow('collector'),
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
export default ArhiveIncomingMailColumns;
