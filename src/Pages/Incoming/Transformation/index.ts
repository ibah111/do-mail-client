import { ClassConstructor } from "class-transformer";
import {
  DataIncomingState,
  IncomingMailState,
} from "../../../Types/dataIncoming";
interface TransformationState {
  [index: string]: ClassConstructor<any>;
  IncomingMail: ClassConstructor<IncomingMailState>;
}
const Transformation: TransformationState = {
  IncomingMail: IncomingMailState,
};
export default Transformation;
