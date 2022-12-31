import { ArhiveType, MailType } from '../Types/dataIncoming';

export interface IDataIncoming {
  arhive?: ArhiveType[];
  mode?: MailType[];
}
