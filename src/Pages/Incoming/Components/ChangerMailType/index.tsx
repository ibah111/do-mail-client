import { subject } from '@casl/ability';
import { Action, Subject } from '../../../../casl/casl.factory';
import { Can } from '../../../../Context/Ability';
import { MailType } from '../../../../Types/dataIncoming';
import CustomButton from './CustomButton';

export default function ChangerMailType() {
  const disabled = true;
  const description = disabled ? 'В доработке' : '';
  return (
    <>
      <Can
        I={Action.Read}
        this={subject(Subject.DataIncoming, { mode: [MailType.INCOMING_MAIL] })}
      >
        <CustomButton value={MailType.INCOMING_MAIL}>
          Входящая почта
        </CustomButton>
      </Can>
      <Can
        I={Action.Read}
        this={subject(Subject.DataIncoming, {
          mode: [MailType.INCOMING_GOVERNMENT_MAIL],
        })}
      >
        <CustomButton value={MailType.INCOMING_GOVERNMENT_MAIL}>
          Госпочта
        </CustomButton>
      </Can>
      <Can
        I={Action.Read}
        this={subject(Subject.DataIncoming, {
          mode: [MailType.INCOMING_COURT_MAIL],
        })}
      >
        <CustomButton value={MailType.INCOMING_COURT_MAIL}>
          Электронная почта(СУД)
        </CustomButton>
      </Can>
      <Can
        I={Action.Read}
        this={subject(Subject.DataIncoming, {
          mode: [MailType.INCOMING_COURT_BAILIFF_MAIL],
        })}
      >
        <CustomButton value={MailType.INCOMING_COURT_BAILIFF_MAIL}>
          Электронная почта (ФССП)
        </CustomButton>

        <CustomButton value={MailType.INCOMING_COURT_BAILIFF_MAIL2}>
          Интернет-приемная
        </CustomButton>

        <CustomButton value={MailType.INCOMING_CREDIT_AGREEMENT_PROCESSING}>
          {`Обработка КД`}
        </CustomButton>
      </Can>
    </>
  );
}
