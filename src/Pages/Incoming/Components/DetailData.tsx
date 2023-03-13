import { DataGridPremium, GridColDef } from '@mui/x-data-grid-premium';
import { Doc } from '../../../Schemas/Doc';
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
];
interface DetailDataProps {
  docs: Doc[];
}
export default function DetailData({ docs }: DetailDataProps) {
  return <DataGridPremium autoHeight columns={columns} rows={docs} />;
}
