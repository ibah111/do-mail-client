import { GridColDef } from '@mui/x-data-grid-premium';
import { AllowFunction } from '../../../hooks/getAllow';
import { ArhiveType, DataIncomingType } from '../../../Types/dataIncoming';
/**
 * Обработка КД
 */
export default function IncomingCreditProcessingColumns<
  K extends DataIncomingType['IncomingCreditAgreementProcessing'][T],
  T extends ArhiveType,
>(isAllow: AllowFunction, arhive?: T): GridColDef<K>[] {
  const data: GridColDef<K>[] = [
    {
      field: 'id',
      headerName: 'ID',
      type: 'number',
    },
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
      field: 'kto_obrabotal',
      headerName: 'Кто обработал',
      type: 'string',
    },
    {
      headerName: 'Наличие КД',
      field: 'have_kd',
      type: 'boolean',
      editable: isAllow('editor'),
    },
    {
      headerName: 'Копия кредитного договора',
      field: 'scan_copy_kd',
      type: 'boolean',
      editable: isAllow('editor'),
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
      valueGetter(params) {
        const types = [
          {
            id: 1,
            value: 'Судебная работа',
          },
          {
            id: 2,
            value: 'Исполнительное производство',
          },
        ];
        const doc_type_id = params.row.doc_type;
        if (doc_type_id) {
          const result = types.find((type) => type.id === doc_type_id);
          if (result) return result.value;
        }
      },
    },
  ];
  return data;
}
