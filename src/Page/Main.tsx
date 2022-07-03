import {
  DataGridPremium,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridCellEditCommitParams,
} from "@mui/x-data-grid-premium";
import { getDatab } from "../function/connect";
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
import AdminPanel from "../Components/AdminPanel";
import React from "react";
import GenerateCol from "../Components/generateCol";
import CustomPagination from "../Components/CustomPagination";
import { useAppDispatch, useAppSelector } from "../Reducer";
import { setSortModel } from "../Reducer/sortModel";
import { setSelectionModel } from "../Reducer/selectionModel";
import { setFilterModel } from "../Reducer/filterModel";
import { setPageModel } from "../Reducer/pageModel";
import ArhivePanel from "../Components/ArhivePanel";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export interface Result {
  Result: AlertColor;
  Code?: string;
  Message?: string;
}
export default function Main() {
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
  const [severity, setSeverity] = React.useState<AlertColor>("info");
  const [comm, setComm] = React.useState("");
  const [result, setResult] = React.useState<Result>({ Result: "info" });
  const [typeDate, setTypeDate] = React.useState("date");
  const [onChange, changes] = React.useState([]);
  const [typeArhive, setTypeArhive] = React.useState(0);
  const prevSelectionModel = React.useRef(select);
  const [mode, setMode] = React.useState(1);
  const changeMode = (value: number) => setMode(value);
  const [columns, setColumns] = React.useState(
    GenerateCol(typeArhive, typeDate, type, mode)
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
    EditCells(value, columns).then((Add) => {
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
    setColumns(GenerateCol(typeArhive, typeDate, type, mode));
  }, [typeArhive, typeDate, type, mode]);
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
          <AdminPanel
            Refresh={Refresh}
            setResult={setResult}
            setTypeDate={setTypeDate}
            select={select[currentTab]}
          />
        </Grid>
        <Grid item xs={"auto"}>
          <ArhivePanel
            type={type}
            choose_type={choose_type}
            setResult={setResult}
            currentTab={currentTab}
            typeArhive={typeArhive}
            Refresh={Refresh}
            setVkladka={setVkladka}
          />
        </Grid>
      </Grid>
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
