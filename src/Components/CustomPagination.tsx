import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  gridPageCountSelector,
  gridPageSelector,
  gridPageSizeSelector,
  gridPaginationSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid-premium";
import React from "react";
const listRange = [25, 50, 100];
export default function CustomPagination() {
  const [open, setOpen] = React.useState(false);
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const [value, setValue] = React.useState(page + 1);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const state = useGridSelector(apiRef, gridPaginationSelector);
  React.useEffect(() => {
    setValue(page + 1);
  }, [page]);

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
                      setOpen(true);
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
                      setOpen(true);
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
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogContent>
            <TextField
              label={"Введите номер страницы"}
              type="number"
              sx={{ width: 200 }}
              value={value}
              onChange={(event) =>
                setValue(
                  Number(event.target.value) > pageCount
                    ? pageCount
                    : Number(event.target.value)
                )
              }
              InputProps={{ inputProps: { min: 1, max: pageCount } }}
            ></TextField>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
                if (value) apiRef.current.setPage(value - 1);
              }}
            >
              Выбрать
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
