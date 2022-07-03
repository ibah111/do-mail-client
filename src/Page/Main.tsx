import {
  DataGridPremium,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridCellEditCommitParams,
} from "@mui/x-data-grid-premium";
import { getDatab } from "../function/connect";
import { GetCookies } from "../function/getcookies";
import { EditCells } from "../function/editCells";
import {
  Snackbar,
  Grid,
  Alert as MuiAlert,
  Button,
  SelectChangeEvent,
  SnackbarCloseReason,
  AlertProps,
  AlertColor,
} from "@mui/material";
import AdminPanel from "../utils/AdminPanel";
import React from "react";
import Arhive from "../utils/Arhive";
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
import { useAppDispatch, useAppSelector } from "../Reducer";
import { setSortModel } from "../Reducer/sortModel";
import { setSelectionModel } from "../Reducer/selectionModel";
import { setFilterModel } from "../Reducer/filterModel";
import { setPageModel } from "../Reducer/pageModel";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
interface MainProps {
  administ: boolean;
  el_arhive: boolean;
  editable: boolean;
  department: string;
}
export interface Result {
  Result: AlertColor;
  Code?: string;
  Message?: string;
}
export default function Main({
  administ,
  el_arhive,
  editable,
  department,
}: MainProps) {
  const [type, setType] = React.useState(1);
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState([]);
  const [currentTab, setTab] = React.useState(1);
  const filter = useAppSelector((state) => state.filterModel);
  const sort = useAppSelector((state) => state.sortModel);
  const page = useAppSelector((state) => state.pageModel);
  const select = useAppSelector((state) => state.selectionModel);
  const [pageSize, setPageSize] = React.useState(25);
  const [length, setLength] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [openDialogArhive, setOpenDialogArhive] = React.useState(false);
  const [severity, setSeverity] = React.useState<AlertColor>("info");
  const [comm, setComm] = React.useState("");
  const [result, setResult] = React.useState<Result>({ Result: "info" });
  const [adminOpen, setAdminOpen] = React.useState(0);
  const [typeDate, setTypeDate] = React.useState("date");
  const [onChange, changes] = React.useState([]);
  const [typeArhive, setTypeArhive] = React.useState(0);
  const [num, setNum] = React.useState<number>(0);
  const prevSelectionModel = React.useRef(select);
  const [mode, setMode] = React.useState(1);
  const changeMode = (value: number) => setMode(value);
  const [columns, setColumns] = React.useState(
    GenerateCol(
      typeArhive,
      editable,
      typeDate,
      department,
      administ,
      type,
      mode
    )
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
  const choose_type = (e: SelectChangeEvent<number>) => {
    prevSelectionModel.current = select;
    if (typeArhive === 1) {
      setTab(1 + Number(e.target.value));
    }
    if (typeArhive === 0) {
      setTab(1);
    }
    setType(Number(e.target.value));
  };
  const Edit = (value: GridCellEditCommitParams) => {
    EditCells(value, GetCookies(), columns).then((Add) => {
      setOpen(true);
      setSeverity(Add.Result);
      setComm(`Код ответа : ${Add.Code}, Сообщение: ${Add.Message}`);
    });
  };

  const handleCloseAlert = (event: React.SyntheticEvent<Element, Event>) => {
    setOpen(false);
  };
  const handleCloseSnackbar = (
    event: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  React.useEffect(() => {
    dispatch(
      setSortModel([
        2,
        [
          {
            field: "data_obrabotki_arhive",
            sort: "asc",
          },
        ],
      ])
    );
    dispatch(
      setSortModel([
        3,
        [
          {
            field: "data_obrabotki_arhive",
            sort: "asc",
          },
        ],
      ])
    );
  }, []);
  React.useEffect(() => {
    setColumns(
      GenerateCol(
        typeArhive,
        editable,
        typeDate,
        department,
        administ,
        type,
        mode
      )
    );
  }, [typeArhive, editable, typeDate, department, administ, type, mode]);
  const setVkladka = (val: number) => {
    prevSelectionModel.current = select;
    if (val === 1) {
      setTab(1 + type);
    }
    if (val === 0) {
      setTab(1);
    }
    setTypeArhive(val);
  };
  React.useEffect(() => {
    getDatab(
      GetCookies(),
      filter[currentTab],
      page[currentTab],
      columns,
      pageSize,
      sort[currentTab],
      typeArhive,
      type,
      mode
    ).then((res) => {
      setData(res.rows);
      setLength(res.count);
      setTimeout(() => {
        dispatch(
          setSelectionModel([
            currentTab,
            prevSelectionModel.current[currentTab],
          ])
        );
      });
    });
  }, [
    filter[currentTab],
    page[currentTab],
    pageSize,
    sort[currentTab],
    typeArhive,
    onChange,
    type,
    mode,
  ]);
  React.useEffect(() => {
    if (Object.keys(result).length > 1) {
      setOpen(true);
      setSeverity(result.Result);
      setComm(`Код ответа : ${result.Code}, Сообщение: ${result.Message}`);
    }
  }, [result]);

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
              {adminOpen === 1 && (
                <AdminPanel
                  Refresh={Refresh}
                  setResult={setResult}
                  setAdminOpen={setAdminOpen}
                  setTypeDate={setTypeDate}
                  select={select[currentTab]}
                />
              )}
              {adminOpen === 0 && (
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => setAdminOpen(1)}
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

              {typeArhive === 0 ? (
                <React.Fragment>
                  {" "}
                  <Arhive
                    select={select[currentTab]}
                    setResult={setResult}
                    typeArhive={type}
                  />{" "}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <React.Fragment>
                    {" "}
                    <Button
                      color="secondary"
                      onClick={() => {
                        if (select[currentTab].length > 0)
                          setOpenDialogArhive(true);
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
                          select[currentTab],
                          setResult,
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
                  typeArhive === 0 ? () => setVkladka(1) : () => setVkladka(0)
                }
              >
                {typeArhive === 0 ? "Перейти в архив" : "Вернуться в Почту"}
              </Button>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
      <Dialog
        open={openDialogArhive}
        onClose={() => setOpenDialogArhive(false)}
      >
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
          <Button onClick={() => setOpenDialogArhive(false)} color="error">
            Закрыть
          </Button>
          <Button
            onClick={() =>
              Add_in_corob(
                select[currentTab],
                num,
                setResult,
                Refresh,
                type,
                setOpenDialogArhive
              )
            }
            color="success"
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
      <DataGridPremium
        page={page[currentTab]}
        rows={data}
        columns={columns}
        rowCount={length}
        pageSize={pageSize}
        onFilterModelChange={(value) => {
          prevSelectionModel.current = select;
          dispatch(setFilterModel([currentTab, value]));
        }}
        pagination
        paginationMode="server"
        onPageChange={(newPage) => {
          prevSelectionModel.current = select;
          dispatch(setPageModel([currentTab, newPage]));
        }}
        filterModel={filter[currentTab]}
        sortingMode="server"
        sortModel={sort[currentTab]}
        onSortModelChange={(newSortModel) => {
          prevSelectionModel.current = select;
          dispatch(setSortModel([currentTab, newSortModel]));
        }}
        onPageSizeChange={(newPageSize) => {
          prevSelectionModel.current = select;
          setPageSize(newPageSize);
        }}
        filterMode="server"
        checkboxSelection
        disableSelectionOnClick
        selectionModel={select[currentTab]}
        onCellEditCommit={Edit}
        onSelectionModelChange={(newSelectionModel) => {
          dispatch(setSelectionModel([currentTab, newSelectionModel]));
        }}
        components={{
          Pagination: CustomPagination,
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          pagination: { mode, changeMode },
        }}
      />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {comm}
        </Alert>
      </Snackbar>
    </div>
  );
}
