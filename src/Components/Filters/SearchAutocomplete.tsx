import {
  getGridNumericOperators,
  GridColTypeDef,
  GridFilterInputValueProps,
} from '@mui/x-data-grid-premium';
import { AutocompleteProps, Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { useAsyncMemo } from '../../utils/asyncMemo';
interface SearchAutocompleteProps<T, K> {
  getter: (current: string) => T[] | Promise<T[]>;
  valueParse: (value: T | null) => K;
  getLabel: (value: T) => string;
}
export function SearchAutocompleteInputFilter<T, K>(
  props: GridFilterInputValueProps & SearchAutocompleteProps<T, K>,
) {
  const { item, applyValue, valueParse, getter, getLabel } = props;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleFilterChange: AutocompleteProps<
    T,
    false,
    false,
    false
  >['onChange'] = (_, value) => {
    applyValue({ ...item, value: valueParse(value) });
  };
  const [current, setCurrent] = React.useState('');
  const selects = useAsyncMemo(() => getter(current), [current]);
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
      getOptionLabel={getLabel}
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
export function SearchAutocomplete<T, K>(
  getter: (current: string) => T[] | Promise<T[]>,
  valueParse: (value: T | null) => K,
  getLabel: (value: T) => string,
) {
  return {
    extendType: 'number',
    type: 'number',
    filterOperators: [
      {
        ...operator,
        InputComponent: SearchAutocompleteInputFilter,
        InputComponentProps: {
          getter,
          valueParse,
          getLabel,
        } as SearchAutocompleteProps<T, K>,
      },
    ],
  } as GridColTypeDef;
}
