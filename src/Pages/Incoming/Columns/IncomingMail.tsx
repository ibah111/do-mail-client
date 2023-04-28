import { Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid-premium';
import { SearchAutocomplete } from '../../../Components/Filters/SearchAutocomplete';
import { AllowFunction } from '../../../hooks/getAllow';
import { ArhiveType, DataIncomingType } from '../../../Types/dataIncoming';
import { checkDateGrid } from '../../../utils/checkDate';
import { generateName } from '../../../utils/generateName';
import addColumnArhive from './addColumnArhive';
import addColumnEditor from './addColumnEditor';

export default function IncomingMailColumns<
  K extends DataIncomingType['IncomingMail'][T],
  T extends ArhiveType,
>(isAllow: AllowFunction, arhive?: T): GridColDef<K>[] {
  const data: GridColDef<K>[] = [
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
      field: 'doc_name',
      headerName: 'Название документа',
      editable: isAllow('editor'),
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
    {
      field: 'kogda_otdano',
      headerName: 'Когда обработано',
      type: 'date',
    },
    {
      field: 'id_kto_obrabotal',
      headerName: 'Кто обработал',
      ...SearchAutocomplete,
      valueFormatter: (params) => {
        if (!params.id) return;
        const row = params.api.getRow(params.id) as K;
        const User = row.User;
        if (User) return generateName(User.f, User.i, User.o);
        return `${row.kto_obrabotal} (удален)`;
      },
    },
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
