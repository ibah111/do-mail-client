import { GridColDef } from '@mui/x-data-grid-premium';
import { AllowFunction } from '../../../hooks/getAllow';
import {
  ArhiveType,
  DataIncomingType,
  MailType,
} from '../../../Types/dataIncoming';
import { generateName } from '../../../utils/generateName';

export default function addColumnArhive<
  K extends DataIncomingType[MailType][ArhiveType],
>(data: GridColDef<K>[], isAllow: AllowFunction, arhive?: ArhiveType) {
  if (arhive && arhive > 0) {
    data.push({
      field: 'Arhive.korob',
      headerName: 'Короб архива',
      type: 'number',
      editable: isAllow('arhive'),
      valueGetter: (params) => {
        if (params.row.Arhive) {
          return params.row.Arhive.korob;
        }
        if (params.row.Arhives)
          for (const item of params.row.Arhives) {
            return item.korob;
          }
      },
    });
    data.push({
      field: 'Arhive.createdAt',
      headerName: 'Дата обработки архива',
      type: 'date',
      valueGetter: (params) => {
        if (params.row.Arhive) {
          return params.row.Arhive.createdAt;
        }
        if (params.row.Arhives)
          for (const item of params.row.Arhives) {
            return item.createdAt;
          }
      },
    });
    data.push({
      field: 'Arhive.User',
      headerName: 'Кто обработал архив',
      valueGetter: (params) => {
        if (params.row.Arhive) {
          const User = params.row.Arhive.User;
          return generateName(User.f, User.i, User.o);
        }
        if (params.row.Arhives)
          for (const item of params.row.Arhives) {
            const User = item.User;
            return generateName(User.f, User.i, User.o);
          }
      },
    });
  }
}
