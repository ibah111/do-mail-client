import * as React from "react";
import {
  IconButton,
  Typography,
  PaginationItem,
  Select,
  MenuItem,
  Pagination,
  Button,
  Grid,
} from "@mui/material";
import {
  gridPageCountSelector,
  gridPageSelector,
  gridPageSizeSelector,
  useGridApiContext,
  useGridSelector,
  gridPaginationSelector,
} from "@mui/x-data-grid-premium";
const listRange = [25, 50, 100];

interface CustomPaginationProps {
  mode: number;
  changeMode: (value: number) => void;
}

export default function CustomPagination({
  mode,
  changeMode,
}: CustomPaginationProps) {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const state = useGridSelector(apiRef, gridPaginationSelector);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
      }}
    >
      <div style={{ marginLeft: 10 }}>
        <Grid container spacing={1}>
          <Grid item>
            <Button
              variant={mode === 1 ? "outlined" : "contained"}
              onClick={(e) => changeMode(1)}
            >
              Входящая почта
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={mode === 2 ? "outlined" : "contained"}
              onClick={(e) => changeMode(2)}
            >
              Госпочта
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={mode === 3 ? "outlined" : "contained"}
              onClick={(e) => changeMode(3)}
            >{`Мейл(Суд)`}</Button>
          </Grid>
          <Grid item>
            <Button
              variant={mode === 4 ? "outlined" : "contained"}
              onClick={(e) => changeMode(4)}
            >{`Мейл(ФССП)`}</Button>
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography sx={{ mx: 2 }}>{"Строк на странице:"}</Typography>
        <Select
          size="small"
          variant="outlined"
          value={pageSize}
          onChange={(e) => {
            apiRef.current.setPageSize(Number(e.target.value));
          }}
        >
          {listRange.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
        <Typography sx={{ mx: 2, ml: 4 }}>Всего:</Typography>
        <Typography sx={{ mr: 2 }}>{state.rowCount}</Typography>
        <Pagination
          color="primary"
          count={pageCount}
          page={page + 1}
          renderItem={(item) => {
            switch (item.type) {
              case "start-ellipsis":
                return (
                  <IconButton
                    size="small"
                    onClick={(value) => {
                      const newPage = Number(prompt("Введите номер страницы:"));
                      if (newPage) apiRef.current.setPage(newPage - 1);
                    }}
                  >
                    ...
                  </IconButton>
                );
              case "end-ellipsis":
                return (
                  <IconButton
                    size="small"
                    onClick={(value) => {
                      const newPage = Number(prompt("Введите номер страницы:"));
                      if (newPage) apiRef.current.setPage(newPage - 1);
                    }}
                  >
                    ...
                  </IconButton>
                );
              default:
                return <PaginationItem {...item} />;
            }
          }}
          onChange={(event, value) => apiRef.current.setPage(value - 1)}
        ></Pagination>
      </div>
    </div>
  );
}
