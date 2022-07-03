import axios from "axios";
import { GetCookies } from "./getcookies";
import server from "../utils/server";
import { GridSelectionModel } from "@mui/x-data-grid-premium";
import { Result } from "../Page/Main";

export default function add_in_corob(
  select: GridSelectionModel,
  number: number | string,
  setResult: React.Dispatch<React.SetStateAction<Result>>,
  Refresh: () => void,
  type: number,
  setOpenDialogArhive: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (number !== null && number !== "") {
    axios({
      url: server() + "/Add_Arhive",
      method: "POST",
      data: {
        select: select,
        ...GetCookies(),
        action: "corob",
        number: number,
        type: type,
      },
    })
      .then((res) => {
        setResult(res.data);
        Refresh();
        setOpenDialogArhive(false);
      })
      .catch((e) => {
        setResult(e.response.data);
      });
  } else alert("Номер короба не указан");
}
