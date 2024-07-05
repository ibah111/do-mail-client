import { Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid-premium';
import searchUser from '../../../api/searchUser';
import { SearchAutocomplete } from '../../../Components/Filters/SearchAutocomplete';
import { AllowFunction } from '../../../hooks/getAllow';
import {
  ArhiveType,
  DataIncomingType,
  IncomingCourtBailiffMailState,
} from '../../../Types/dataIncoming';
import { checkDateGrid } from '../../../utils/checkDate';
import { generateName } from '../../../utils/generateName';
import addColumnArhive from './addColumnArhive';
import addColumnEditor from './addColumnEditor';
/**
 * Электронная почта ФССП
 */
export default function IncomingCourtBailiffMailColumns<
  K extends DataIncomingType['IncomingCourtBailiffMail'][T],
  T extends ArhiveType,
>(isAllow: AllowFunction, arhive?: T): GridColDef<K>[] {
  const data: GridColDef<K>[] = [
    { field: 'id', headerName: ' ID записи', type: 'number' },
    {
      headerName: 'Номер типа документа',
      type: 'number',
      field: 'type_of_document_id',
    },
    {
      headerName: 'Наименование типа документа',
      type: 'string',
      field: 'type_of_document_name',
    },

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
      valueGetter: (params) => {
        const arhive = params.row.Arhive?.doc_name;
        if (arhive) return arhive;
        return params.row.doc_name;
      },
      valueSetter: (params) => {
        if (arhive)
          return {
            ...params.row,
            Arhive: { ...params.row.Arhive, doc_name: params.value },
          };
        return { ...params.row, doc_name: params.value };
      },
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
      field: 'id_kto_obrabotal',
      headerName: 'Кто обработал',
      ...SearchAutocomplete(
        searchUser,
        (value) => value?.contact_id,
        (value) => generateName(value.f, value.i, value.o),
      ),
      valueFormatter: (params) => {
        if (!params.id) return;
        const row = params.api.getRow(params.id) as K;
        const User = row.User;
        if (User) return generateName(User.f, User.i, User.o);
        return `${row.kto_obrabotal} (удален)`;
      },
    },
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
