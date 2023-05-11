import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Doc } from '../Schemas/Doc';
import { findAndCount } from './findAndCount';
export class User {
  f: string;
  i: string;
  o: string;
}
export class Arhive {
  @IsNumber()
  id: number;
  @IsNumber()
  incoming_id: number;
  @IsOptional()
  @IsNumber()
  korob?: number;
  @IsOptional()
  @IsString()
  doc_name?: number;

  @IsOptional()
  @IsBoolean()
  out_worktime?: boolean;
  @IsNumber()
  user: number;
  @Type(() => User)
  User: User;
  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}
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

  /**
   * ID Испол задачи
   */
  @IsNumber()
  id_ispol_zadach: number;

  /**
   * ID Задачи
   */
  @IsNumber()
  id_zadach: number;

  /**
   * Прикрепленные документы
   */
  @Type(() => Doc)
  Docs?: Doc[];

  @Type(() => User)
  User?: User;

  @Type(() => Arhive)
  Arhive?: Arhive;

  @Type(() => Arhive)
  Arhives?: Arhive[];
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

  /**
   * ID Испол задачи
   */
  @IsNumber()
  id_ispol_zadach: number;

  /**
   * ID Задачи
   */
  @IsNumber()
  id_zadach: number;

  /**
   * Прикрепленные документы
   */
  @Type(() => Doc)
  Docs?: Doc[];

  @Type(() => User)
  User?: User;

  @Type(() => Arhive)
  Arhive?: Arhive;

  @Type(() => Arhive)
  Arhives?: Arhive[];
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

  /**
   * ID Испол задачи
   */
  @IsNumber()
  id_ispol_zadach: number;

  /**
   * ID Задачи
   */
  @IsNumber()
  id_zadach: number;

  /**
   * Прикрепленные документы
   */
  @Type(() => Doc)
  Docs?: Doc[];

  @Type(() => User)
  User?: User;

  @Type(() => Arhive)
  Arhive?: Arhive;

  @Type(() => Arhive)
  Arhives?: Arhive[];
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

  /**
   * ID Испол задачи
   */
  @IsNumber()
  id_ispol_zadach: number;

  /**
   * ID Задачи
   */
  @IsNumber()
  id_zadach: number;

  /**
   * Прикрепленные документы
   */
  @Type(() => Doc)
  Docs?: Doc[];

  @Type(() => User)
  User?: User;

  @Type(() => Arhive)
  Arhive?: Arhive;

  @Type(() => Arhive)
  Arhives?: Arhive[];
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
  INCOMING_COURT_BAILIFF_MAIL2 = 'IncomingCourtBailiffMail2',
}

export type ArhiveIncomingState<T> = {
  [ArhiveType.NO]: T;
  [ArhiveType.ARHIVE]: T;
  [ArhiveType.ARHIVE_LAW_EXEC]: T;
};
export class DataIncomingState {
  /**
   * Входящая почта
   */
  [MailType.INCOMING_MAIL]: ArhiveIncomingState<
    findAndCount<IncomingMailState>
  >;
  /**
   * Госпочта
   */
  [MailType.INCOMING_GOVERNMENT_MAIL]: ArhiveIncomingState<
    findAndCount<IncomingGovernmentMailState>
  >;
  /**
   * МЕЙЛ(СУД)
   */
  [MailType.INCOMING_COURT_MAIL]: ArhiveIncomingState<
    findAndCount<IncomingCourtMailState>
  >;
  /**
   * МЕЙЛ(ФССП)
   */
  [MailType.INCOMING_COURT_BAILIFF_MAIL]: ArhiveIncomingState<
    findAndCount<IncomingCourtBailiffMailState>
  >;
  [MailType.INCOMING_COURT_BAILIFF_MAIL2]: ArhiveIncomingState<
    findAndCount<IncomingCourtBailiffMailState>
  >;
}
export class DataIncomingType {
  /**
   * Входящая почта
   */
  [MailType.INCOMING_MAIL]: ArhiveIncomingState<IncomingMailState>;
  /**
   * Госпочта
   */
  [MailType.INCOMING_GOVERNMENT_MAIL]: ArhiveIncomingState<IncomingGovernmentMailState>;
  /**
   * МЕЙЛ(СУД)
   */
  [MailType.INCOMING_COURT_MAIL]: ArhiveIncomingState<IncomingCourtMailState>;
  /**
   * МЕЙЛ(ФССП)
   */
  [MailType.INCOMING_COURT_BAILIFF_MAIL]: ArhiveIncomingState<IncomingCourtBailiffMailState>;
  /**
   * ИНТЕРНЕТ ПРИЕМНАЯ
   */
  [MailType.INCOMING_COURT_BAILIFF_MAIL2]: ArhiveIncomingState<IncomingCourtBailiffMailState>;
}
