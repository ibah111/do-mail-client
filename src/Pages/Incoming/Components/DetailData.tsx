import { DataGridPremium, GridColDef } from '@mui/x-data-grid-premium';
import { Doc } from '../../../Schemas/Doc';
import { IconButton, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import createCode from '../../../api/ScannerDocsApi/createCode';
import { enqueueSnackbar } from 'notistack';
import { useAppDispatch } from '../../../Reducer';
import { setReload } from '../../../Reducer/Stater';
import { DataGridEvents, DataGridEventsEnum } from '../DataGrid';
import DeleteIcon from '@mui/icons-material/Delete';
import deleteCode from '../../../api/ScannerDocsApi/deleteCode';
import OpenDocuments from './DetailedDataComponents/OpenDocument';

class NeedForApi {
  mail_id: number;
  law_id: number;
  doc_type: number;
}

function docColumns(
  { mail_id, law_id, doc_type }: NeedForApi,
  DialogTrigger: EventTarget,
): GridColDef<Doc>[] {
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
              <>
                {value}
                <>
                  <IconButton
                    onClick={() => {
                      const incoming_id = params.row.incoming_id;
                      deleteCode({
                        barcode,
                        incoming_id,
                      }).then(() => {
                        enqueueSnackbar('Штрихкод удалён', {
                          variant: 'warning',
                        });
                        dispatch(setReload(true));
                      });
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              </>
            ) : (
              <>
                {'Штрихкод не присвоен'}
                <Tooltip title={'Присвоить штрихкод'}>
                  <IconButton
                    onClick={() => {
                      if (!doc_type) {
                        enqueueSnackbar(
                          'У документа нет типа, открываю диалог',
                          {
                            variant: 'warning',
                            autoHideDuration: 2000,
                          },
                        );
                        DialogTrigger.dispatchEvent(
                          new DataGridEvents(
                            DataGridEventsEnum.OpenTypeDialog,
                            mail_id,
                          ),
                        );
                      }
                      /**
                       * при наличии типа документа
                       * мы можем позволить запрос
                       * к сканер-доку
                       */
                      if (doc_type)
                        return createCode(
                          {
                            contact_doc_id: params.row.doc_id,
                            title: params.row.DocAttach?.name || '',
                            law_case_id: law_id,
                            mail_id: mail_id,
                            doc_type: doc_type,
                          },
                          params.row.id,
                        ).then(() => dispatch(setReload(true)));
                    }}
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
    {
      headerName: 'Действия',
      field: 'actions',
      type: 'actions',
      getActions: (params) => [
        <OpenDocuments
          id={Number(params.row.doc_id)}
          title={params.row.DocAttach?.name || ''}
        />,
      ],
    },
  ];
  return columns;
}

interface DetailDataProps {
  docs: Doc[];
  api_data: NeedForApi;
  DialogTrigger: EventTarget;
}
export default function DetailData({
  docs,
  api_data,
  DialogTrigger,
}: DetailDataProps) {
  return (
    <DataGridPremium
      autoHeight
      columns={docColumns(api_data, DialogTrigger)}
      rows={docs}
    />
  );
}
