import { DocAttach } from '@contact/models';

export class Doc {
  /**
   * Внутренний id документа
   */
  id: number;

  /**
   * ID почта
   */
  incoming_id: number;

  /**
   * ID документа
   */
  doc_id: number;

  /**
   * Требуется ли отправить документы в сканер
   */
  sender: boolean;

  /**
   * Отправлен ли документ в Doc-scanner
   */
  sended: boolean;
  /**
   * Штрих-код
   */
  barcode: string;

  /**
   * Привязанные DocAttach
   */
  DocAttach?: DocAttach;
}
