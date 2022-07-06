import {
  GridCellEditCommitParams,
  GridColumns,
} from "@mui/x-data-grid-premium";
import axios from "axios";
import { getToken } from "../utils/getToken";
import server from "../utils/server";

export const EditCells = async (
  value: GridCellEditCommitParams,
  columns: GridColumns
) => {
  const Result = await axios({
    url: server() + "/edit",
    method: "POST",
    data: { value, ...getToken(), columns: columns },
  });
  return Result.data;
};
