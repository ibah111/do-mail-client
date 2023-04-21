import {
  GridFilterOperator,
  getGridStringOperators,
} from '@mui/x-data-grid-premium';
import { NotContains } from './NotContains';

export const filterOperatorsString: GridFilterOperator[] = [
  ...getGridStringOperators(),
  NotContains,
];
