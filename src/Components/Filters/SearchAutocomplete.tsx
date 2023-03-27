import {
  getGridNumericOperators,
  GridColTypeDef,
  GridFilterInputValueProps,
} from '@mui/x-data-grid-premium';
import {
  AutocompleteProps,
  Autocomplete,
  TextField,
  Box,
  CircularProgress,
} from '@mui/material';
import React from 'react';
import { useAsyncMemo } from '../../utils/asyncMemo';
import searchUser from '../../api/searchUser';
import { User } from '../../api/getRole';
import { generateName } from '../../utils/generateName';
export function SearchAutocompleteInputFilter(
  props: GridFilterInputValueProps,
) {
  const { item, applyValue } = props;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleFilterChange: AutocompleteProps<
    User,
    false,
    false,
    false
  >['onChange'] = (_, value) => {
    applyValue({ ...item, value: value?.bitrix_id });
  };
  const [current, setCurrent] = React.useState('');
  const selects = useAsyncMemo(() => searchUser(current), [current]);
  return (
    <Autocomplete
      options={selects ? selects : []}
      onChange={handleFilterChange}
      open={open}
      value={item.value}
      inputValue={current}
      onInputChange={(_, value) => {
        setCurrent(value);
      }}
      getOptionLabel={(option) => generateName(option.f, option.i, option.o)}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderInput={(params) => (
        <TextField
          label="Значение"
          {...params}
          InputLabelProps={{ shrink: true }}
          variant="standard"
        />
      )}
    />
  );
}
const operator = getGridNumericOperators().find((item) => item.value === '=')!;
export const SearchAutocomplete: GridColTypeDef = {
  extendType: 'number',
  filterOperators: [
    { ...operator, InputComponent: SearchAutocompleteInputFilter },
  ],
};
