import { GridColumns } from "@mui/x-data-grid-premium";
import { ArhiveIncomingMailState } from "../../../Types/dataIncoming";

const ArhiveIncomingMailColumns: GridColumns<ArhiveIncomingMailState> = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "date_post", headerName: "Дата поступления", type: "date" },
  { field: "convert", headerName: "Учет конвертов", type: "boolean" },
  { field: "pristavi", headerName: "Приставы", type: "boolean" },
  { field: "adr_otp", headerName: "Адрес отправителя" },
  { field: "otprav", headerName: "Отправитель" },
  { field: "reestr", headerName: "Реестр" },
  { field: "doc_name", headerName: "Название документа" },
  { field: "st_pnkt", headerName: "Статья и пункт" },
  { field: "gd", headerName: "ГД - Гражданское дело" },
  { field: "fio_dol", headerName: "ФИО должника" },
  { field: "kd", headerName: "КД - Кредитный договор" },
  { field: "ispol_zadach", headerName: "Исполнитель задачи" },
  { field: "vsisk", headerName: "ФИО взыскателя" },
  { field: "kogda_otdano", headerName: "Когда обработано", type: "date" },
  { field: "kto_obrabotal", headerName: "Кто обработал" },
  { field: "nal_skan", headerName: "Скан", type: "boolean" },
  {
    field: "check_vsisk",
    headerName: "Проверено взыскателем",
    type: "boolean",
  },
  { field: "check_vsisk_name", headerName: "Кем проверено" },
  { field: "korob_arhive", headerName: " Короб архива", type: "number" },
  {
    field: "data_obrabotki_arhive",
    headerName: " Дата обработки архива",
    type: "date",
  },
  {
    field: "kto_obrabotal_arhive",
    headerName: " Кто обработал архив",
  },
];
export default ArhiveIncomingMailColumns;
