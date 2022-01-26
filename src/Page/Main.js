import { DataGridPro } from '@mui/x-data-grid-pro';
import { getDatab } from '../function/connect'
import { GetCookies } from '../function/getcookies'
import { EditCells } from '../function/editCells'
import { Snackbar, Grid, Alert as MuiAlert, Button } from '@mui/material';
import { Admin } from '../utils/AdminPanel'
import React from 'react'
import El_arhive from '../utils/El_arhive'
import GenerateCol from '../function/generateCol'
import { FormControl, InputLabel, Dialog, DialogContentText, TextField, DialogTitle, DialogContent, DialogActions, Select, MenuItem } from "@mui/material";
import Add_in_corob from '../function/add_in_corob'
import Delete_from_arhive from '../function/delete_from_arhive'


const createDictUseState=(hook, count, init)=>{
  let result = {}
  for (let i = 1; i<=count; i++) {
    const [value, setValue] = hook(init);
    result[i]={value, setValue}
  }
  return result;
}
export default function Main({ administ, el_arhive }) {
  const [type, settype] = React.useState(1)
  const [data, setdata] = React.useState([]);
  const filter = createDictUseState(React.useState, 3, { items: [] });
  const [currentFilter,setFilter]=React.useState(1);
  const [sortModel, setSortModel] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [editable, setedit] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(25)
  const [length, setLength] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [vari, setVari] = React.useState("info")
  const [comm, setComm] = React.useState("")
  const [valu, setvalu] = React.useState({})
  const [adopen, setadopen] = React.useState(0)
  const [d, sd] = React.useState("date")
  const [onChange, changes] = React.useState([]);
  const [select, setSelectionModel] = React.useState([])
  const prevSelectionModel = React.useRef(select);
  const [Vkladka, setVkladka] = React.useState(0);
  const [num, setNum] = React.useState(null)
  const Refresh = () => {
    changes([])
  };


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const choose_type = (e) => {
    settype(e.target.value)
  }
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
  const columns = GenerateCol(Vkladka, editable, d)
  React.useEffect(() => {
    getDatab(GetCookies(), filter[currentFilter].value, page, columns, pageSize, sortModel, Vkladka, type).then((res) => {
      setedit(res.editor)
      setdata(res.rows)
      setLength(res.count);
      setSelectionModel(prevSelectionModel.current);
    });
    if (Vkladka === 1) {
      setFilter(1+type)
    }
    if (Vkladka === 0) {
      setFilter(1)
    }
  }, [filter[currentFilter].value, page, pageSize, sortModel, Vkladka, onChange, type]);
  React.useEffect(() => {
    if (Object.keys(valu).length > 0) {
      setOpen(true)
      setVari(valu.Result)
      setComm(`Код ответа : ${valu.Code}, Сообщение: ${valu.Message}`)
    }
  }, [valu])

  return (
    <div style={{ height: '93vh', width: '99vw' }}>
      <Grid container justifyContent="space-between">
        <Grid item xs={"auto"}>
          {administ && <React.Fragment>{adopen === 1 && <Admin Refresh={Refresh} setvalu={setvalu} adopen={adopen} setadopen={setadopen} sd={sd} select={select} />}
            {adopen === 0 && <Button color="success" variant="contained" onClick={() => setadopen(1)}>Админка</Button>}</React.Fragment>}</Grid><Grid item xs={"auto"}>
          {el_arhive && <React.Fragment>
            <FormControl size="small" sx={{ width: '13vh' }} color="secondary">
              <InputLabel id="age-label">Тип</InputLabel>
              <Select labelId="age-label" id="age" label="Тип" value={type} onChange={choose_type}>
                <MenuItem value={1}>Обычные</MenuItem>
                <MenuItem value={2}>ИД</MenuItem>
              </Select>
            </FormControl> 
            
            {Vkladka === 0 ? <React.Fragment> <El_arhive select={select} setvalu={setvalu} type={type} /> </React.Fragment> : <React.Fragment><React.Fragment> <Button color="secondary" onClick={() => {
              if (select.length > 0)
              setOpenD(true)
              else
              alert("Ни одна строка не выбрана")
            }
              } variant="contained">Внесение в короб</Button> </React.Fragment> <React.Fragment>
              <Button color="secondary" variant="contained" onClick={()=>Delete_from_arhive(select, setvalu, Refresh)}>Убрать из архива</Button>
               </React.Fragment> </React.Fragment>}
            <Button color="secondary" variant="outlined" onClick={Vkladka === 0 ? () => setVkladka(1) : () => setVkladka(0)}>{Vkladka === 0 ? "Перейти в архив" : "Вернуться в Почту"}</Button>
          </React.Fragment>
          }</Grid>
      </Grid>
      <Dialog open={openD} onClose={() => setOpenD(false)}>
        <DialogTitle>Внесение</DialogTitle>
        <DialogContent>
          <DialogContentText>Впишите номер короба</DialogContentText>
          <TextField
            onChange={(e) => { setNum(e.target.value) }}
            autoFocus
            label="№ Короба"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenD(false)} color="error">Закрыть</Button>
          <Button onClick={() => Add_in_corob(select, num, setvalu, Refresh)} color="success">Сохранить</Button>
        </DialogActions>
      </Dialog>
      <DataGridPro
        page={page}
        rows={data}
        columns={columns}
        rowCount={length}
        pageSize={pageSize}
        onFilterModelChange={(value) => {
          prevSelectionModel.current = select;
          filter[currentFilter].setValue(value)
        }
        }
        pagination
        paginationMode="server"
        onPageChange={(newPage) => {
          prevSelectionModel.current = select;
          setPage(newPage)
        }}
        filterModel={filter[currentFilter].value}
        sortingMode="server"
        onSortModelChange={(newSortModel) => {
          prevSelectionModel.current = select;
          setSortModel(newSortModel)
        }
        }
        onPageSizeChange={(newPageSize) => {
          prevSelectionModel.current = select;
          setPageSize(newPageSize)
        }
        }
        filterMode="server"
        checkboxSelection
        disableSelectionOnClick
        onCellEditCommit={Edit}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={select}
      />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={vari} sx={{ width: '100%' }}>
          {comm}
        </Alert>
      </Snackbar>
    </div>
  )
}