import { GridColumns } from "@mui/x-data-grid-premium";
import { store } from "../../../Reducer";
import { ArhiveState } from "../../../Reducer/Stater";
import { DataIncomingState } from "../../../Types/dataIncoming";
import ArhiveIncomingCourtBailiffMailColumns from "./ArhiveIncomingCourtBailiffMail";
import ArhiveIncomingCourtMailColumns from "./ArhiveIncomingCourtMail";
import ArhiveIncomingGovernmentMailColumns from "./ArhiveIncomingGovernmentMail";
import ArhiveIncomingMailColumns from "./ArhiveIncomingMail";
import IncomingCourtBailiffMailColumns from "./IncomingCourtBailiffMail";
import IncomingCourtMailColumns from "./IncomingCourtMail";
import IncomingGovernmentMailColumns from "./IncomingGovernmentMail";
import IncomingMailColumns from "./IncomingMail";
type ColumnsState = {
  [index: string]: (
    isAllow: (...args: string[]) => boolean
  ) => GridColumns<any>;
};
export const allColumns: ColumnsState = {
  IncomingMail: IncomingMailColumns,
  IncomingGovernmentMail: IncomingGovernmentMailColumns,
  IncomingCourtMail: IncomingCourtMailColumns,
  IncomingCourtBailiffMail: IncomingCourtBailiffMailColumns,
  ArhiveIncomingMail: ArhiveIncomingMailColumns,
  ArhiveIncomingGovernmentMail: ArhiveIncomingGovernmentMailColumns,
  ArhiveIncomingCourtMail: ArhiveIncomingCourtMailColumns,
  ArhiveIncomingCourtBailiffMail: ArhiveIncomingCourtBailiffMailColumns,
};
export default function getColumns<T extends keyof DataIncomingState>(
  typ: T,
  arhive: ArhiveState
) {
  return allColumns[`${arhive > 0 ? "Arhive" : ""}${typ}`](isAllow());
}
export const isAllow = () => {
  const roles = store.getState().User.roles;
  return (...userRoles: string[]) => {
    let result = 0;
    for (const role of userRoles) {
      roles.includes(role);
      result += 1;
    }
    return result > 0;
  };
};
