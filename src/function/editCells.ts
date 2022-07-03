import {
  GridCellEditCommitParams,
  GridColumns,
} from "@mui/x-data-grid-premium";
import axios from "axios";
import server from "../utils/server";
import { Token } from "./getcookies";

export const EditCells = async (
  value: GridCellEditCommitParams,
  coockie: Token,
  columns: GridColumns
) => {
  const Result = await axios({
    url: server() + "/edit",
    method: "POST",
    data: { value, ...coockie, columns: columns },
  });
  return Result.data;
};
