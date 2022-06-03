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
} from "@mui/x-data-grid-pro";
const listRange = [25, 50, 100];

export default function CustomPagination({activBtn, changeActive}) {
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
              id={1}
              variant={activBtn === 1 ? "outlined" : "contained"}
              onClick={changeActive}
            >
              Входящая почта
            </Button>
          </Grid>
          <Grid item>
            <Button
              id={2}
              variant={activBtn === 2 ? "outlined" : "contained"}
              onClick={changeActive}
            >
              Госпочта
            </Button>
          </Grid>
          <Grid item>
            <Button
              id={3}
              variant={activBtn === 3 ? "outlined" : "contained"}
              onClick={changeActive}
            >{`Мейл(Суд)`}</Button>
          </Grid>
          <Grid item>
            <Button
              id={4}
              variant={activBtn === 4 ? "outlined" : "contained"}
              onClick={changeActive}
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
            apiRef.current.setPageSize(e.target.value);
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
