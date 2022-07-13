import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { findAndCount } from './findAndCount';

export class IncomingMailState {
  /**
   * ID записи
   */
  @IsNumber()
  id: number;

  /**
   * Дата поступления
   */
  @IsDate()
  @Type(() => Date)
  date_post: Date;

  /**
   * Учет конвертов
   */
  @IsBoolean()
  convert: boolean;

  /**
   * Приставы
   */
  @IsBoolean()
  pristavi: boolean;

  /**
   * Адрес отправителя
   */
  @IsString()
  adr_otp: string;

  /**
   * Отправитель
   */
  @IsString()
  otprav: string;

  /**
   * Реестр
   */
  @IsString()
  reestr: string;

  /**
   * Название документа
   */
  @IsString()
  doc_name: string;

  /**
   * Статья и пункт
   */
  @IsString()
  st_pnkt: string;

  /**
   * ГД - Гражданское дело
   */
  @IsString()
  gd: string;

  /**
   * ФИО должника
   */
  @IsString()
  fio_dol: string;

  /**
   * КД - Кредитный договор
   */
  @IsString()
  kd: string;

  /**
   * Исполнитель задачи
   */
  @IsString()
  ispol_zadach: string;

  /**
   * ФИО взыскателя
   */
  @IsString()
  vsisk: string;

  /**
   * Когда обработано
   */
  @IsDate()
  @Type(() => Date)
  kogda_otdano: Date;

  /**
   * Кто обработал
   */
  @IsString()
  kto_obrabotal: string;

  /**
   * Скан
   */
  @IsBoolean()
  nal_skan: boolean;

  /**
   * Проверено взыскателем
   */
  @IsString()
  check_vsisk: boolean;

  /**
   * Кем проверено
   */
  @IsString()
  check_vsisk_name: string;
}

export class IncomingGovernmentMailState {
  /**
   * ID записи
   */
  @IsNumber()
  id: number;

  /**
   * Дата поступления
   */
  @IsDate()
  @Type(() => Date)
  date_post: Date;

  /**
   * Отправитель
   */
  @IsString()
  otprav: string;

  /**
   * Реестр
   */
  @IsString()
  reestr: string;

  /**
   * Название документа
   */
  @IsString()
  doc_name: string;

  /**
   * ГД - Гражданское дело
   */
  @IsString()
  gd: string;

  /**
   * ФИО должника
   */
  @IsString()
  fio_dol: string;

  /**
   * Исполнитель задачи
   */
  @IsString()
  ispol_zadach: string;

  /**
   * ФИО взыскателя
   */
  @IsString()
  vsisk: string;

  /**
   * Когда обработано
   */
  @IsDate()
  @Type(() => Date)
  kogda_otdano: Date;

  /**
   * Кто обработал
   */
  @IsString()
  kto_obrabotal: string;

  /**
   * Проверено взыскателем
   */
  @IsString()
  check_vsisk: boolean;

  /**
   * Кем проверено
   */
  @IsString()
  check_vsisk_name: string;

  /**
   * Истец, взыскатель
   */
  @IsString()
  ist: string;

  /**
   * Дата вынесения документа
   */
  @IsDate()
  @Type(() => Date)
  dateDoc: Date;

  /**
   * ЕЦП
   */
  @IsString()
  ecp: string;
}
export class IncomingCourtMailState {
  /**
   * ID записи
   */
  @IsNumber()
  id: number;

  /**
   * Дата поступления
   */
  @IsDate()
  @Type(() => Date)
  date_post: Date;

  /**
   * Отправитель
   */
  @IsString()
  otprav: string;

  /**
   * Реестр
   */
  @IsString()
  reestr: string;

  /**
   * Название документа
   */
  @IsString()
  doc_name: string;

  /**
   * ГД - Гражданское дело
   */
  @IsString()
  gd: string;

  /**
   * ФИО должника
   */
  @IsString()
  fio_dol: string;

  /**
   * Исполнитель задачи
   */
  @IsString()
  ispol_zadach: string;

  /**
   * ФИО взыскателя
   */
  @IsString()
  vsisk: string;

  /**
   * Когда обработано
   */
  @IsDate()
  @Type(() => Date)
  kogda_otdano: Date;

  /**
   * Кто обработал
   */
  @IsString()
  kto_obrabotal: string;

  /**
   * Проверено взыскателем
   */
  @IsString()
  check_vsisk: boolean;

  /**
   * Кем проверено
   */
  @IsString()
  check_vsisk_name: string;

  /**
   * Откуда
   */
  @IsString()
  adres: string;

  /**
   * На какую почту
   */
  @IsString()
  mail: string;
}
export class IncomingCourtBailiffMailState {
  /**
   * ID записи
   */
  @IsNumber()
  id: number;

  /**
   * Дата поступления
   */
  @IsDate()
  @Type(() => Date)
  date_post: Date;

  /**
   * Отправитель
   */
  @IsString()
  otprav: string;

  /**
   * Реестр
   */
  @IsString()
  reestr: string;

  /**
   * Название документа
   */
  @IsString()
  doc_name: string;

  /**
   * ГД - Гражданское дело
   */
  @IsString()
  gd: string;

  /**
   * ФИО должника
   */
  @IsString()
  fio_dol: string;

  /**
   * Исполнитель задачи
   */
  @IsString()
  ispol_zadach: string;

  /**
   * ФИО взыскателя
   */
  @IsString()
  vsisk: string;

  /**
   * Когда обработано
   */
  @IsDate()
  @Type(() => Date)
  kogda_otdano: Date;

  /**
   * Кто обработал
   */
  @IsString()
  kto_obrabotal: string;

  /**
   * Проверено взыскателем
   */
  @IsString()
  check_vsisk: boolean;

  /**
   * Кем проверено
   */
  @IsString()
  check_vsisk_name: string;
}
export class ArhiveIncomingMailState extends IncomingMailState {
  /**
   * Короб архива
   */
  @IsNumber()
  korob_arhive: number;

  /**
   * Дата обработки архива
   */
  @IsDate()
  @Type(() => Date)
  data_obrabotki_arhive: Date;

  /**
   * Кто обработал архив
   */
  @IsString()
  kto_obrabotal_arhive: string;
}
export class ArhiveIncomingGovernmentMailState extends IncomingGovernmentMailState {
  /**
   * Короб архива
   */
  @IsNumber()
  korob_arhive: number;

  /**
   * Дата обработки архива
   */
  @IsDate()
  @Type(() => Date)
  data_obrabotki_arhive: Date;

  /**
   * Кто обработал архив
   */
  @IsString()
  kto_obrabotal_arhive: string;
}
export class ArhiveIncomingCourtMailState extends IncomingCourtMailState {
  /**
   * Короб архива
   */
  @IsNumber()
  korob_arhive: number;

  /**
   * Дата обработки архива
   */
  @IsDate()
  @Type(() => Date)
  data_obrabotki_arhive: Date;

  /**
   * Кто обработал архив
   */
  @IsString()
  kto_obrabotal_arhive: string;
}
export class ArhiveIncomingCourtBailiffMailState extends IncomingCourtBailiffMailState {
  /**
   * Короб архива
   */
  @IsNumber()
  korob_arhive: number;

  /**
   * Дата обработки архива
   */
  @IsDate()
  @Type(() => Date)
  data_obrabotki_arhive: Date;

  /**
   * Кто обработал архив
   */
  @IsString()
  kto_obrabotal_arhive: string;
}

export enum ArhiveType {
  NO = 0,
  ARHIVE = 1,
  ARHIVE_LAW_EXEC = 2,
}
export enum MailType {
  INCOMING_MAIL = 'IncomingMail',
  INCOMING_GOVERNMENT_MAIL = 'IncomingGovernmentMail',
  INCOMING_COURT_MAIL = 'IncomingCourtMail',
  INCOMING_COURT_BAILIFF_MAIL = 'IncomingCourtBailiffMail',
}

export class DataIncomingState {
  /**
   * Входящая почта
   */
  [MailType.INCOMING_MAIL]: {
    [ArhiveType.NO]: findAndCount<IncomingMailState>;
    [ArhiveType.ARHIVE]: findAndCount<ArhiveIncomingMailState>;
    [ArhiveType.ARHIVE_LAW_EXEC]: findAndCount<ArhiveIncomingMailState>;
  };
  /**
   * Госпочта
   */
  [MailType.INCOMING_GOVERNMENT_MAIL]: {
    [ArhiveType.NO]: findAndCount<IncomingGovernmentMailState>;
    [ArhiveType.ARHIVE]: findAndCount<ArhiveIncomingGovernmentMailState>;
    [ArhiveType.ARHIVE_LAW_EXEC]: findAndCount<ArhiveIncomingGovernmentMailState>;
  };
  /**
   * МЕЙЛ(СУД)
   */
  [MailType.INCOMING_COURT_MAIL]: {
    [ArhiveType.NO]: findAndCount<IncomingCourtMailState>;
    [ArhiveType.ARHIVE]: findAndCount<ArhiveIncomingCourtMailState>;
    [ArhiveType.ARHIVE_LAW_EXEC]: findAndCount<ArhiveIncomingCourtMailState>;
  };
  /**
   * МЕЙЛ(ФССП)
   */
  [MailType.INCOMING_COURT_BAILIFF_MAIL]: {
    [ArhiveType.NO]: findAndCount<IncomingCourtBailiffMailState>;
    [ArhiveType.ARHIVE]: findAndCount<ArhiveIncomingCourtBailiffMailState>;
    [ArhiveType.ARHIVE_LAW_EXEC]: findAndCount<ArhiveIncomingCourtBailiffMailState>;
  };
}
export class DataIncomingType {
  /**
   * Входящая почта
   */
  [MailType.INCOMING_MAIL]: {
    [ArhiveType.NO]: IncomingMailState;
    [ArhiveType.ARHIVE]: ArhiveIncomingMailState;
    [ArhiveType.ARHIVE_LAW_EXEC]: ArhiveIncomingMailState;
  };
  /**
   * Госпочта
   */
  [MailType.INCOMING_GOVERNMENT_MAIL]: {
    [ArhiveType.NO]: IncomingGovernmentMailState;
    [ArhiveType.ARHIVE]: ArhiveIncomingGovernmentMailState;
    [ArhiveType.ARHIVE_LAW_EXEC]: ArhiveIncomingGovernmentMailState;
  };
  /**
   * МЕЙЛ(СУД)
   */
  [MailType.INCOMING_COURT_MAIL]: {
    [ArhiveType.NO]: IncomingCourtMailState;
    [ArhiveType.ARHIVE]: ArhiveIncomingCourtMailState;
    [ArhiveType.ARHIVE_LAW_EXEC]: ArhiveIncomingCourtMailState;
  };
  /**
   * МЕЙЛ(ФССП)
   */
  [MailType.INCOMING_COURT_BAILIFF_MAIL]: {
    [ArhiveType.NO]: IncomingCourtBailiffMailState;
    [ArhiveType.ARHIVE]: ArhiveIncomingCourtBailiffMailState;
    [ArhiveType.ARHIVE_LAW_EXEC]: ArhiveIncomingCourtBailiffMailState;
  };
}
