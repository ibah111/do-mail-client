import { ClassConstructor } from "class-transformer";
import {
  IncomingGovernmentMailState,
  IncomingMailState,
} from "../../../Types/dataIncoming";
interface TransformationState {
  [index: string]: ClassConstructor<any>;
  IncomingMail: ClassConstructor<IncomingMailState>;
  IncomingGovernmentMail: ClassConstructor<IncomingGovernmentMailState>;
}
const Transformation: TransformationState = {
  IncomingMail: IncomingMailState,
  IncomingGovernmentMail: IncomingGovernmentMailState,
};
export default Transformation;
