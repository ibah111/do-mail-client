import { DataGridPro } from '@mui/x-data-grid-pro';
import { getDatab } from '../function/connect'
import { GetCookies } from '../function/getcookies'
import { EditCells } from '../function/editCells'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from 'react'



export default function Main() {
  const [data, setdata] = React.useState([]);
  const [filterModel, setFilterModel] = React.useState({ items: [] });
  const [sortModel, setSortModel] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [editable, setedit] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(25)
  const [length, setLength] = React.useState(0);
  const [open, setOpen] = React.useState(false)
  const [vari, setVari] = React.useState("info")
  const [comm, setComm] = React.useState("")

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  const Edit = (value) => {
    EditCells(value, GetCookies()).then((Add)=>{
      setOpen(true)
      setVari(Add.Result)
      setComm(`Код ответа : ${Add.Code}, Сообщение: ${Add.Message}`)
})
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
}
  const columns = [
    {
      field: 'date_post',
      type: 'date',
      headerName: 'Дата поступления',
      width: 150,
      editable,
      sortable: true,
      valueGetter: (params) => new Date(params.value)
    },
    {
      field: 'convert',
      headerName: 'Учёт конвертов',
      type: 'boolean',
      width: 150,
      editable,
      sortable: true,
    },
    {
      field: 'adr_otp',
      headerName: 'Адрес отправителя',
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: 'otprav',
      headerName: 'Отправитель',
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: 'reestr',
      headerName: 'Реестр',
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: 'doc_name',
      headerName: 'Название документа',
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: 'st_pnkt',
      headerName: 'Статья и пункт',
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: 'gd',
      headerName: 'ГД',
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: 'fio_dol',
      headerName: 'ФИО должника',
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: 'kd',
      headerName: 'КД',
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: 'ispol_zadach',
      headerName: 'Исполнитель задачи',
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: 'vsisk',
      headerName: 'Взыскатель',
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: 'kogda_otdano',
      type: 'date',
      headerName: 'Когда обработано',
      editable,
      sortable: true,
      width: 160,
      valueGetter: (params) => new Date(params.value)
    },
    {
      field: 'kto_obrabotal',
      headerName: 'Кто обработал',
      editable,
      sortable: true,
      width: 160,
    },
  ];
  React.useEffect(() => {
    getDatab(GetCookies(),filterModel, page, columns, pageSize, sortModel).then((res) => {
      setedit(res.editor)
      setdata(res.rows)
      setLength(res.count);
    })
  }, [filterModel, page, pageSize, sortModel]);
  return (
    <div style={{ height: 900, width: '100%' }}>
      <DataGridPro
        page={page}
        rows={data}
        columns={columns}
        rowCount={length}
        pageSize={pageSize}
        onFilterModelChange={setFilterModel}
        pagination
        paginationMode="server"
        onPageChange={(newPage) => {
          setPage(newPage)
        }}
        sortingMode="server"
        onSortModelChange={setSortModel}
        onPageSizeChange={setPageSize}
        filterMode="server"
        checkboxSelection
        disableSelectionOnClick
        onCellEditCommit={Edit}
      />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={vari} sx={{ width: '100%' }}>
                    {comm}
                </Alert>
            </Snackbar>
    </div>
  )
}