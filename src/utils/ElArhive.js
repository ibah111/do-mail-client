import React from "react";
import SaveIcon from '@mui/icons-material/Save';
import server from '../utils/server';
import axios from 'axios'
import { GetCookies } from '../function/getcookies'
import { Button } from "@mui/material";

export default function El_arhive({ select, setvalu, type }) {
  const add_to_arhive = () => {
    console.log(type)
    if (select.length > 0) {
      axios({
        url: server() + '/Add_Arhive', method: 'POST', data: { select: select, ...GetCookies(), type: type, action: "add"}
      }).then((resu) => {
        setvalu(resu.data)
      }).catch((e) => {
        setvalu(e.response.data)
      })
    } else
      alert("Ни одна строка не выбрана")
  }
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
  )
}