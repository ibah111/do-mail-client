import axios from "axios";
import server from "../utils/server";
import { GridSelectionModel } from "@mui/x-data-grid-premium";
import React from "react";
import { Result } from "../Page/Main";
import { getToken } from "../utils/getToken";

export default function delete_from_arhive(
  select: GridSelectionModel,
  setResult: React.Dispatch<React.SetStateAction<Result>>,
  Refresh: () => void,
  type: number
) {
  if (select.length > 0) {
    axios({
      url: server() + "/Add_Arhive",
      method: "POST",
      data: { select: select, ...getToken(), action: "delete", type: type },
    })
      .then((res) => {
        setResult(res.data);
        Refresh();
      })
      .catch((e) => {
        setResult(e.response.data);
      });
  } else alert("Ни одна строка не выбрана");
}
