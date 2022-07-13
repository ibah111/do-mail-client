import { MailType } from '../../../../Types/dataIncoming';
import CustomButton from './CustomButton';

export default function ChangerMode() {
  return (
    <>
      <CustomButton mode={MailType.INCOMING_MAIL}>Входящая почта</CustomButton>
      <CustomButton mode={MailType.INCOMING_GOVERNMENT_MAIL}>
        Госпочта
      </CustomButton>
      <CustomButton mode={MailType.INCOMING_COURT_MAIL}>
        Электронная почта(СУД)
      </CustomButton>
      <CustomButton mode={MailType.INCOMING_COURT_BAILIFF_MAIL}>
        Электронная почта (ФССП)
      </CustomButton>
    </>
  );
}
