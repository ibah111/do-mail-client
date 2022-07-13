import { GridPreProcessEditCellProps } from '@mui/x-data-grid-premium';
import moment from 'moment';

export const checkDateGrid = (params: GridPreProcessEditCellProps) => {
  return { ...params.props, error: !moment(params.props.value).isValid() };
};
