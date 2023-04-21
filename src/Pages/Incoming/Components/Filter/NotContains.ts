import {
  GridFilterInputValue,
  GridFilterOperator,
} from '@mui/x-data-grid-premium';

export const NotContains: GridFilterOperator = {
  label: 'Не содержит',
  value: 'notContains',
  getApplyFilterFn: () => null,
  InputComponent: GridFilterInputValue,
};
