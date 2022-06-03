import { Button } from "@mui/material";
import React from "react";

export default function generateCol(
  mode,
  editable,
  d,
  dep,
  admin,
  type,
  activBtn
) {
  const columns = [
    { field: "id", headerName: "№", width: 90 },
    {
      field: "date_post",
      type: "date",
      headerName: "Дата поступления",
      width: 150,
      editable,
      sortable: true,
      valueGetter: (params) => new Date(params.value),
    },
    {
      field: "adr_otp",
      headerName: "Адрес отправителя",
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: "otprav",
      headerName: "Отправитель",
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: "reestr",
      headerName: "Реестр",
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: "doc_name",
      headerName: "Название документа",
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: "st_pnkt",
      headerName: "Статья и пункт",
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: "gd",
      headerName: "ГД",
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: "fio_dol",
      headerName: "ФИО должника",
      // filterOperators: containsFilter(),
      editable,
      //filter_for: "list",
      sortable: true,
      width: 160,
    },
    {
      field: "kd",
      headerName: "КД",
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: "ispol_zadach",
      headerName: "Исполнитель задачи",
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: "vsisk",
      headerName: "Взыскатель",
      editable,
      sortable: true,
      width: 160,
    },
    {
      field: "kogda_otdano",
      type: d,
      headerName: "Когда обработано",
      sortable: true,
      width: 160,
      valueGetter: (params) => new Date(params.value),
    },
    {
      field: "kto_obrabotal",
      headerName: "Кто обработал",
      sortable: true,
      width: 160,
    },

    // {
    //   field: "mode",
    //   headerName: "Тип документа",
    //   editable,
    //   sortable: true,
    //   width: 160,
    //   valueGetter: (params) => {
    //     switch (params.value) {
    //       case 1:
    //         return "Входящая почта";
    //       case 2:
    //         return "Госпочта";
    //       case 3:
    //         return "Мейл(Суд)";
    //       case 4:
    //         return "Мейл(ФССП)";
    //       default:
    //         return "Входящая почта";
    //     }
    //   },
    // },
  ];
  switch (activBtn) {
    case 2: {
      let tmp = [
        {
          field: "ist",
          headerName: "Истец, взыскатель",
          editable,
          sortable: true,
          width: 160,
        },
        {
          field: "dateDoc",
          headerName: "Дата вынесения документа",
          type: d,
          editable,
          sortable: true,
          width: 160,
          valueGetter: (params) => params.value && new Date(params.value),
        },
        {
          field: "ecp",
          headerName: "ЭЦП",
          editable,
          sortable: true,
          width: 160,
        },
      ];
      for (const v of tmp) columns.push(v);
      break;
    }

    case 3: {
      let tmp = [
        {
          field: "adres",
          headerName: "Адрес(mail)",
          editable,
          sortable: true,
          width: 160,
        },
        {
          field: "dateDoc",
          headerName: "Дата вынесения документа",
          type: d,
          editable,
          sortable: true,
          width: 160,
          valueGetter: (params) => params.value && new Date(params.value),
        },
        {
          field: "mail",
          headerName: "На какой E-MAIL поступило",
          editable,
          sortable: true,
          width: 160,
        },
      ];
      for (const v of tmp) columns.push(v);
      break;
    }
    case 4: {
      let tmp = [
        {
          field: "adres",
          headerName: "Адрес(mail)",
          editable,
          sortable: true,
          width: 160,
        },
        {
          field: "dateDoc",
          headerName: "Дата вынесения документа",
          type: d,
          editable,
          sortable: true,
          width: 160,
          valueGetter: (params) => params.value && new Date(params.value),
        },
      ];
      for (const v of tmp) columns.push(v);
      break;
    }
    default: {
      let tmp = {
        2: {
          field: "convert",
          headerName: "Учёт конвертов",
          type: "boolean",
          width: 150,
          editable,
          sortable: true,
        },
        3: {
          field: "pristavi",
          headerName: "Приставы",
          type: "boolean",
          width: 150,
          editable,
          sortable: true,
        },
        14: {
          field: "nal_skan",
          headerName: "Скан",
          type: "boolean",
          editable,
          sortable: true,
          width: 160,
        },
      };
      for (const v in tmp) columns.splice(v, 0, tmp[v]);
      break;
    }
  }
  if (dep === "Отдел взыскания ") {
    columns.push({
      field: "check_vsisk",
      headerName: "Проверено взыскателем",
      type: "boolean",
      editable: true,
      sortable: true,
      width: 80,
    });
    columns.push({
      field: "check_vsisk_name",
      headerName: "Кем проверено",
      sortable: true,
      width: 250,
    });
  }
  columns.push({
    field: "ssilka_na_zadachu",
    headerName: "Ссылка на задачу",
    sortable: true,
    width: 160,
    valueGetter: (params) => {
      if (params.row.id_zadach !== undefined && params.row.id_zadach !== null) {
        const userID = params.row.id_ispol_zadach;
        const ID = params.row.id_zadach;
        return `https://chat.nbkfinance.ru/company/personal/user/${userID}/tasks/task/view/${ID}/`;
      }
    },
    renderCell: (params) =>
      params.value && (
        <strong>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            href={params.value}
            target="_blank"
          >
            Открыть задачу
          </Button>
        </strong>
      ),
  });
  if (admin) {
    columns.push({
      field: "check_vsisk",
      headerName: "Проверено взыскателем",
      type: "boolean",
      editable: true,
      sortable: true,
      width: 80,
    });
    columns.push({
      field: "check_vsisk_name",
      headerName: "Кем проверено",
      sortable: true,
      editable: true,
      width: 250,
    });
  }
  if (mode === 1 || mode) {
    if (type === 1) {
      columns.map((value) => {
        if (value.field === "doc_name") {
          value.field = "doc_name_arhive";
          value.editable = true;
          value.valueGetter = (params) => {
            if (params.value === null) return params.row.doc_name;
            else return params.value;
          };
        }
      });
      columns.push({
        field: "korob_arhive",
        headerName: "Короб",
        type: "number",
        editable: true,
        sortable: true,
        width: 80,
      });
      columns.push({
        field: "data_obrabotki_arhive",
        headerName: "Когда переведено в архив",
        type: d,
        sortable: true,
        width: 160,
        valueGetter: (params) => new Date(params.value),
      });
      columns.push({
        field: "kto_obrabotal_arhive",
        headerName: "Кто перевёл в архив",
        sortable: true,
        width: 160,
      });
    }
    if (type === 2) {
      columns.map((value) => {
        if (value.field === "doc_name") {
          value.field = "doc_name_arhive_id";
          value.editable = true;
          value.valueGetter = (params) => {
            if (params.value === null) return params.row.doc_name;
            else return params.value;
          };
        }
      });
      columns.push({
        field: "korob_arhive_id",
        headerName: "Короб",
        type: "number",
        editable: true,
        sortable: true,
        width: 80,
      });
      columns.push({
        field: "data_obrabotki_arhive_id",
        headerName: "Когда переведено в архив",
        type: d,
        sortable: true,
        width: 160,
        valueGetter: (params) => new Date(params.value),
      });
      columns.push({
        field: "kto_obrabotal_arhive_id",
        headerName: "Кто перевёл в архив",
        sortable: true,
        width: 160,
      });
    }
  }

  return columns;
}
