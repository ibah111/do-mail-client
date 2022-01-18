import { DataGridPro } from '@mui/x-data-grid-pro';
import { getDatab } from '../function/connect'
import { GetCookies } from '../function/getcookies'
import { EditCells } from '../function/editCells'
import { Snackbar, Alert as MuiAlert, Button } from '@mui/material';
import { Admin } from '../utils/AdminPanel'
import React from 'react'



export default function Main({administ, editorist}) {
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
  const [valu, setvalu] = React.useState({})
  const [adopen, setadopen] = React.useState(0)

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const Edit = (value) => {
    EditCells(value, GetCookies()).then((Add) => {
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
    { field: 'id', headerName: '№', width: 90 },
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
      field: 'pristavi',
      headerName: 'Приставы',
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
    {
      field: 'nal_skan',
      headerName: 'Скан',
      type: 'boolean',
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: 'ssilka_na_zadachu',
      headerName: 'Ссылка на задачу',
      sortable: true,
      width: 160,
      valueGetter: (params) => {
        if (params.row.id_zadach !== undefined && params.row.id_zadach !== null) {
          const userID = params.row.id_ispol_zadach;
          const ID = params.row.id_zadach;
          return `https://testbitrix.ru/company/personal/user/${userID}/tasks/task/view/${ID}/`
        }
      },
      renderCell: (params) => (params.value &&
        <strong>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            href={params.value}
            target="_blank"
          >
            Открыть задачу
          </Button>
        </strong>)
    }
  ];
  React.useEffect(() => {
    getDatab(GetCookies(), filterModel, page, columns, pageSize, sortModel).then((res) => {
      setedit(res.editor)
      setdata(res.rows)
      setLength(res.count);
    })
  }, [filterModel, page, pageSize, sortModel]);
  React.useEffect(() => {
    if (Object.keys(valu).length > 0) {
      setOpen(true)
      setVari(valu.Result)
      setComm(`Код ответа : ${valu.Code}, Сообщение: ${valu.Message}`)
    }
  }, [valu])
  return (
    <div style={{ height: '93vh', width: '99vw' }}>
      { administ && <div>{adopen === 1 && <Admin setvalu={setvalu} adopen={adopen} setadopen={setadopen} />}
      {adopen === 0 && <Button color="success" variant="contained" onClick={()=>setadopen(1)}>Админка</Button>}</div>}
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