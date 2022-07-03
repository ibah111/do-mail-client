import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import server from "../utils/server";
import axios from "axios";
import { Button } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid-premium";
import { Result } from "../Page/Main";
import { getToken } from "../utils/getToken";
interface ArhiveProps {
  select: GridSelectionModel;
  setResult: React.Dispatch<React.SetStateAction<Result>>;
  typeArhive: number;
}
export default function Arhive({ select, setResult, typeArhive }: ArhiveProps) {
  const add_to_arhive = () => {
    console.log(typeArhive);
    if (select.length > 0) {
      axios({
        url: server() + "/Add_Arhive",
        method: "POST",
        data: {
          select: select,
          ...getToken(),
          type: typeArhive,
          action: "add",
        },
      })
        .then((resu) => {
          setResult(resu.data);
        })
        .catch((e) => {
          setResult(e.response.data);
        });
    } else alert("Ни одна строка не выбрана");
  };
  return (
    <React.Fragment>
      <Button
        color="secondary"
        startIcon={<SaveIcon />}
        variant="contained"
        onClick={add_to_arhive}
      >
        Перенести в архив
      </Button>
    </React.Fragment>
  );
}
