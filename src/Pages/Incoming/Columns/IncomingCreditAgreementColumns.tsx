import { GridColDef } from '@mui/x-data-grid-premium';
import { AllowFunction } from '../../../hooks/getAllow';
import { ArhiveType, DataIncomingType } from '../../../Types/dataIncoming';

export default function IncomingCreditProcessingColumns<
  K extends DataIncomingType['IncomingCourtMail'][T],
  T extends ArhiveType,
>(isAllow?: AllowFunction, arhive?: T): GridColDef<K>[] {
  const data: GridColDef<K>[] = [
    {
      field: 'id',
      headerName: 'ID',
      type: 'number',
    },
    {
      field: 'reestr',
      headerName: 'Реестр',
      type: 'string',
    },
    {
      field: 'doc_name',
      headerName: 'Имя документа',
      type: 'string',
    },
    {
      field: 'fio',
      headerName: 'ФИО',
      type: 'string',
    },
    {
      field: 'kd',
      headerName: 'Кредитный договор',
      type: 'string',
    },
    {
      field: 'kogda_otrabotano',
      headerName: 'Когда отработано',
      type: 'string',
    },
    {
      field: 'kto_obrabotal',
      headerName: 'Кто обработал',
      type: 'string',
    },
    {
      headerName: 'Копия кредитного договора',
      field: 'credit_agreement_scan_copy',
      type: 'string',
    },
    {
      headerName: 'КД наличие',
      field: 'kd_nalichie',
      type: 'string',
    },
    {
      field: 'id_dela',
      type: 'number',
      headerName: 'ID дела',
    },
    {
      field: 'doc_type',
      headerName: 'Тип документа',
      type: 'number',
    },
  ];
  return data;
}
