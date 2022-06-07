import {
  DataGridPro,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-pro";
import { getDatab } from "../function/connect";
import { GetCookies } from "../function/getcookies";
import { EditCells } from "../function/editCells";
import { Snackbar, Grid, Alert as MuiAlert, Button } from "@mui/material";
import { Admin } from "../utils/AdminPanel";
import React from "react";
import ElArhive from "../utils/ElArhive";
import GenerateCol from "../function/generateCol";
import CustomPagination from "../utils/pagination";
import {
  FormControl,
  InputLabel,
  Dialog,
  DialogContentText,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
} from "@mui/material";
import Add_in_corob from "../function/add_in_corob";
import Delete_from_arhive from "../function/delete_from_arhive";

const createDictUseState = (hook, count, init) => {
  let result = {};
  for (let i = 1; i <= count; i++) {
    const [value, setValue] = hook(init);
    result[i] = { value, setValue };
  }
  return result;
};
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Main({ administ, el_arhive, editable, dep }) {
  const [type, settype] = React.useState(1);
  const [data, setdata] = React.useState([]);
  const filter = createDictUseState(React.useState, 3, { items: [] });
  const [currentTab, setTab] = React.useState(1);
  const sort = createDictUseState(React.useState, 3, []);
  const page = createDictUseState(React.useState, 3, 0);
  const [pageSize, setPageSize] = React.useState(25);
  const [length, setLength] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [vari, setVari] = React.useState("info");
  const [comm, setComm] = React.useState("");
  const [valu, setvalu] = React.useState({});
  const [adopen, setadopen] = React.useState(0);
  const [d, sd] = React.useState("date");
  const [onChange, changes] = React.useState([]);
  const select = createDictUseState(React.useState, 3, []);
  const [Vkladka, setVkl] = React.useState(0);
  const [num, setNum] = React.useState(null);
  const prevSelectionModel = React.useRef(select);
  const [activBtn, setActiveBtn] = React.useState(1);
  const changeActive = (e) => setActiveBtn(+e.target.id);
  const [columns, setColumns] = React.useState(
    GenerateCol(Vkladka, editable, d, dep, administ, type, activBtn)
  );
  const Refresh = () => {
    changes([]);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }
  const choose_type = (e) => {
    prevSelectionModel.current = select;
    if (Vkladka === 1) {
      setTab(1 + e.target.value);
    }
    if (Vkladka === 0) {
      setTab(1);
    }
    settype(e.target.value);
  };
  const Edit = (value) => {
    EditCells(value, GetCookies(), columns).then((Add) => {
      setOpen(true);
      setVari(Add.Result);
      setComm(`Код ответа : ${Add.Code}, Сообщение: ${Add.Message}`);
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  React.useEffect(() => {
    sort[2].setValue([
      {
        field: "data_obrabotki_arhive",
        sort: "asc",
      },
    ]);
    sort[3].setValue([
      {
        field: "data_obrabotki_arhive",
        sort: "asc",
      },
    ]);
  }, []);
  React.useEffect(() => {
    setColumns(GenerateCol(Vkladka, editable, d, dep, administ, type, activBtn));
  }, [Vkladka, editable, d, dep, administ, type, activBtn]);
  const setVkladka = (val) => {
    prevSelectionModel.current = select;
    if (val === 1) {
      setTab(1 + type);
    }
    if (val === 0) {
      setTab(1);
    }
    setVkl(val);
  };
  React.useEffect(() => {
    getDatab(
      GetCookies(),
      filter[currentTab].value,
      page[currentTab].value,
      columns,
      pageSize,
      sort[currentTab].value,
      Vkladka,
      type,
      activBtn
    ).then((res) => {
      setdata(res.rows);
      setLength(res.count);
      setTimeout(() => {
        select[currentTab].setValue(
          prevSelectionModel.current[currentTab].value
        );
      });
    });
  }, [
    filter[currentTab].value,
    page[currentTab].value,
    pageSize,
    sort[currentTab].value,
    Vkladka,
    onChange,
    type,
    activBtn
  ]);
  React.useEffect(() => {
    if (Object.keys(valu).length > 0) {
      setOpen(true);
      setVari(valu.Result);
      setComm(`Код ответа : ${valu.Code}, Сообщение: ${valu.Message}`);
    }
  }, [valu]);

  return (
    <div style={{ height: "94.5vh", width: "99vw" }}>
      <Grid container justifyContent="space-between">
        <Grid item xs={"auto"}>
          <React.Fragment>
            <Button onClick={() => Refresh()} variant="outlined">
              Обновить
            </Button>{" "}
          </React.Fragment>
          {administ && (
            <React.Fragment>
              {adopen === 1 && (
                <Admin
                  Refresh={Refresh}
                  setvalu={setvalu}
                  adopen={adopen}
                  setadopen={setadopen}
                  sd={sd}
                  select={select[currentTab].value}
                />
              )}
              {adopen === 0 && (
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => setadopen(1)}
                >
                  Админка
                </Button>
              )}
            </React.Fragment>
          )}
        </Grid>
        <Grid item xs={"auto"}>
          {el_arhive && (
            <React.Fragment>
              <FormControl
                size="small"
                sx={{ width: "13vh" }}
                color="secondary"
              >
                <InputLabel id="age-label">Тип</InputLabel>
                <Select
                  labelId="age-label"
                  id="age"
                  label="Тип"
                  value={type}
                  onChange={choose_type}
                >
                  <MenuItem value={1}>Обычные</MenuItem>
                  <MenuItem value={2}>ИД</MenuItem>
                </Select>
              </FormControl>

              {Vkladka === 0 ? (
                <React.Fragment>
                  {" "}
                  <ElArhive
                    select={select[currentTab].value}
                    setvalu={setvalu}
                    type={type}
                  />{" "}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <React.Fragment>
                    {" "}
                    <Button
                      color="secondary"
                      onClick={() => {
                        if (select[currentTab].value.length > 0) setOpenD(true);
                        else alert("Ни одна строка не выбрана");
                      }}
                      variant="contained"
                    >
                      Внесение в короб
                    </Button>{" "}
                  </React.Fragment>{" "}
                  <React.Fragment>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() =>
                        Delete_from_arhive(
                          select[currentTab].value,
                          setvalu,
                          Refresh,
                          type
                        )
                      }
                    >
                      Убрать из архива
                    </Button>
                  </React.Fragment>{" "}
                </React.Fragment>
              )}
              <Button
                color="secondary"
                variant="outlined"
                onClick={
                  Vkladka === 0 ? () => setVkladka(1) : () => setVkladka(0)
                }
              >
                {Vkladka === 0 ? "Перейти в архив" : "Вернуться в Почту"}
              </Button>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
      <Dialog open={openD} onClose={() => setOpenD(false)}>
        <DialogTitle>Внесение</DialogTitle>
        <DialogContent>
          <DialogContentText>Впишите номер короба</DialogContentText>
          <TextField
            onChange={(e) => {
              setNum(Number(e.target.value));
            }}
            autoFocus
            label="№ Короба"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenD(false)} color="error">
            Закрыть
          </Button>
          <Button
            onClick={() =>
              Add_in_corob(
                select[currentTab].value,
                num,
                setvalu,
                Refresh,
                type,
                setOpenD
              )
            }
            color="success"
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
      <DataGridPro
        page={page[currentTab].value}
        rows={data}
        columns={columns}
        rowCount={length}
        pageSize={pageSize}
        onFilterModelChange={(value) => {
          prevSelectionModel.current = select;
          filter[currentTab].setValue(value);
        }}
        pagination
        paginationMode="server"
        onPageChange={(newPage) => {
          prevSelectionModel.current = select;
          page[currentTab].setValue(newPage);
        }}
        filterModel={filter[currentTab].value}
        sortingMode="server"
        sortModel={sort[currentTab].value}
        onSortModelChange={(newSortModel) => {
          prevSelectionModel.current = select;
          sort[currentTab].setValue(newSortModel);
        }}
        onPageSizeChange={(newPageSize) => {
          prevSelectionModel.current = select;
          setPageSize(newPageSize);
        }}
        filterMode="server"
        checkboxSelection
        disableSelectionOnClick
        selectionModel={select[currentTab].value}
        onCellEditCommit={Edit}
        onSelectionModelChange={(newSelectionModel) => {
          select[currentTab].setValue(newSelectionModel);
        }}
        components={{
          Pagination: CustomPagination,
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          pagination: { activBtn, changeActive },
        }}
      />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={vari} sx={{ width: "100%" }}>
          {comm}
        </Alert>
      </Snackbar>
    </div>
  );
}
