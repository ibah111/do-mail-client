import { DataGridPremium, GridColDef } from '@mui/x-data-grid-premium';
import { Doc } from '../../../Schemas/Doc';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import createCode from '../../../api/ScannerDocsApi/createCode';

class NeedForApi {
  mail_id: number;
  law_id: number;
}

function docColumns({ mail_id, law_id }: NeedForApi): GridColDef<Doc>[] {
  const columns: GridColDef<Doc>[] = [
    { field: 'id', type: 'number', headerName: 'ID' },
    { field: 'doc_id', type: 'number', headerName: 'ID документа в контакте' },
    {
      field: 'name',
      type: 'string',
      headerName: 'Название документа',
      width: 300,
      valueGetter: (params) => params.row.DocAttach?.name,
    },
    {
      type: 'string',
      field: 'barcode',
      width: 300,
      headerName: 'Штрихкод',
      description: 'Данное поле указывает номер штрихкода в ScannerDocs',
      valueGetter(params) {
        const barcode = params.row.barcode;
        return barcode ? barcode : 'Штрихкод не присвоен';
      },
    },
    {
      type: 'actions',
      field: 'actions',
      width: 150,
      getActions: (params) => [
        <>
          {!params.row.barcode ? (
            <Tooltip title={'Присвоить штрихкод'}>
              <IconButton
                onClick={() =>
                  createCode({
                    contact_doc_id: params.row.doc_id,
                    title: params.row.DocAttach!.name,
                    law_act_id: law_id,
                    mail_id,
                    doc_type: 2,
                  })
                }
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          ) : (
            'Баркод уже присовен'
          )}
        </>,
      ],
    },
  ];
  return columns;
}

interface DetailDataProps {
  docs: Doc[];
}
export default function DetailData(
  { docs }: DetailDataProps,
  api_data: NeedForApi,
) {
  return (
    <DataGridPremium autoHeight columns={docColumns(api_data)} rows={docs} />
  );
}
