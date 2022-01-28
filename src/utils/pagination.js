import * as React from 'react';
import { IconButton, Typography, PaginationItem, Select, MenuItem, Pagination } from '@mui/material';
import {
  gridPageCountSelector,
  gridPageSelector,
  gridPageSizeSelector,
  useGridApiContext,
  useGridSelector,
  gridPaginationSelector
} from '@mui/x-data-grid-pro';
const listRange = [25, 50, 100]

export default function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const state = useGridSelector(apiRef, gridPaginationSelector);

  return (
    <div style={{ display: "flex", alignItems: 'center', justifyContent: 'flex-end' }}>
      <Typography sx={{ mx: 2 }}>{"Строк на странице:"}</Typography>
      <Select size="small" variant="outlined"
        value={pageSize}
        onChange={(e) => { apiRef.current.setPageSize(e.target.value) }}
      >
        {listRange.map(value => <MenuItem value={value}>{value}</MenuItem>)}
      </Select>
      <Typography sx={{ mx: 2, ml:4 }}>Всего:</Typography>
      <Typography sx={{ mr: 2 }}>{state.rowCount}</Typography>
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        renderItem={(item) => {
          console.log(item)
          switch (item.type) {
            case "previous":
              return <><PaginationItem {...item} /></>
            case "page":
              return <PaginationItem {...item} />
            case "end-ellipsis":
              return <IconButton size="small" onClick={(value) => {
                const newPage = Number(prompt("Введите номер страницы:"));
                if (newPage) apiRef.current.setPage(newPage - 1);
              }}>...</IconButton>
            case "next":
              return <PaginationItem {...item} />
          }
        }}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      ></Pagination>
    </div>
  );
}