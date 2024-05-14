import { DataGridPremium, GridColDef } from '@mui/x-data-grid-premium';
import { Doc } from '../../../Schemas/Doc';
import { IconButton, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import createCode from '../../../api/ScannerDocsApi/createCode';
import { enqueueSnackbar } from 'notistack';
import { useAppDispatch } from '../../../Reducer';
import { setReload } from '../../../Reducer/Stater';

class NeedForApi {
  mail_id: number;
  law_id: number;
  doc_type: number;
}

function docColumns({
  mail_id,
  law_id,
  doc_type,
}: NeedForApi): GridColDef<Doc>[] {
  const dispatch = useAppDispatch();
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
      align: 'center',
      headerAlign: 'center',
      renderCell(params) {
        const barcode = params.row.barcode;
        const value = barcode;
        return (
          <>
            {value ? (
              value
            ) : (
              <>
                <Typography variant="h6">{'Штрихкод не присвоен'}</Typography>
                <Tooltip title={'Присвоить штрихкод'}>
                  <IconButton
                    onClick={() =>
                      createCode(
                        {
                          contact_doc_id: params.row.doc_id,
                          title: params.row.DocAttach?.name || '',
                          law_act_id: law_id,
                          mail_id: mail_id,
                          doc_type: doc_type,
                        },
                        params.row.id,
                      ).then(() => dispatch(setReload(true)))
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </>
        );
      },
    },
  ];
  return columns;
}

interface DetailDataProps {
  docs: Doc[];
  api_data: NeedForApi;
}
export default function DetailData({ docs, api_data }: DetailDataProps) {
  return (
    <DataGridPremium autoHeight columns={docColumns(api_data)} rows={docs} />
  );
}
