import { MailType } from '../../../../Types/dataIncoming';
import CustomButton from './CustomButton';

export default function ChangerMailType() {
  return (
    <>
      <CustomButton value={MailType.INCOMING_MAIL}>Входящая почта</CustomButton>
      <CustomButton value={MailType.INCOMING_GOVERNMENT_MAIL}>
        Госпочта
      </CustomButton>
      <CustomButton value={MailType.INCOMING_COURT_MAIL}>
        Электронная почта(СУД)
      </CustomButton>
      <CustomButton value={MailType.INCOMING_COURT_BAILIFF_MAIL}>
        Электронная почта (ФССП)
      </CustomButton>
    </>
  );
}
