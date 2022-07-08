import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { findAndCount } from "./findAndCount";

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

export class DataIncomingState {
  /**
   * Входящая почта
   */
  IncomingMail: findAndCount<IncomingMailState>;
  /**
   * Госпочта
   */
  IncomingGovernmentMail: findAndCount<IncomingGovernmentMailState>;
  /**
   * МЕЙЛ(СУД)
   */
  IncomingCourtMail: findAndCount<IncomingCourtMailState>;
  /**
   * МЕЙЛ(ФССП)
   */
  IncomingCourtBailiffMail: findAndCount<IncomingCourtBailiffMailState>;
  /**
   * Входящая почта (АРХИВ)
   */
  ArhiveIncomingMail: findAndCount<ArhiveIncomingMailState>;
  /**
   * Госпочта (АРХИВ)
   */
  ArhiveIncomingGovernmentMail: findAndCount<ArhiveIncomingGovernmentMailState>;
  /**
   * МЕЙЛ(СУД) (АРХИВ)
   */
  ArhiveIncomingCourtMail: findAndCount<ArhiveIncomingCourtMailState>;
  /**
   * МЕЙЛ(ФССП) (АРХИВ)
   */
  ArhiveIncomingCourtBailiffMail: findAndCount<ArhiveIncomingCourtBailiffMailState>;
}
