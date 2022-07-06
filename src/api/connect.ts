import {
  GridColumns,
  GridFilterModel,
  GridSortModel,
} from "@mui/x-data-grid-premium";
import axios from "axios";
import { getToken } from "../utils/getToken";
import server from "../utils/server";

export const getDatab = async (
  filter: GridFilterModel,
  page: number,
  columns: GridColumns,
  limit: number,
  sort: GridSortModel,
  arhive: number,
  type: number,
  mode: number
) => {
  const Data = await axios({
    url: server() + "/data",
    method: "POST",
    data: {
      ...getToken(),
      filter,
      page,
      columns,
      limit,
      sort,
      arhive,
      type,
      mode,
    },
  });
  return Data.data;
};
