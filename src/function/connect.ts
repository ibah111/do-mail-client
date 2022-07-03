import {
  GridColumns,
  GridFilterModel,
  GridSortModel,
} from "@mui/x-data-grid-premium";
import axios from "axios";
import server from "../utils/server";
import { Token } from "./getcookies";

export const getDatab = async (
  token: Token,
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
      ...token,
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
