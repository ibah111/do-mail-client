import { GridColumns } from "@mui/x-data-grid-premium";
import { ArhiveIncomingCourtBailiffState } from "../../../Types/dataIncoming";

const ArhiveIncomingCourtBailiffColumns: GridColumns<ArhiveIncomingCourtBailiffState> =
  [
    { field: "id", headerName: " ID записи", type: "number" },
    { field: "date_post", headerName: " Дата поступления", type: "date" },
    { field: "otprav", headerName: " Отправитель", type: "string" },
    { field: "reestr", headerName: " Реестр", type: "string" },
    { field: "doc_name", headerName: " Название документа", type: "string" },
    { field: "gd", headerName: " ГД - Гражданское дело", type: "string" },
    { field: "fio_dol", headerName: " ФИО должника", type: "string" },
    {
      field: "ispol_zadach",
      headerName: " Исполнитель задачи",
      type: "string",
    },
    { field: "vsisk", headerName: " ФИО взыскателя", type: "string" },
    { field: "kogda_otdano", headerName: " Когда обработано", type: "date" },
    { field: "kto_obrabotal", headerName: " Кто обработал", type: "string" },
    {
      field: "check_vsisk",
      headerName: " Проверено взыскателем",
      type: "boolean",
    },
    { field: "check_vsisk_name", headerName: " Кем проверено", type: "string" },
  ];
export default ArhiveIncomingCourtBailiffColumns;
