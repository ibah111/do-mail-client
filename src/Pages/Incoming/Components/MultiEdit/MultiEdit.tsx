import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputBaseComponentProps,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from '@mui/material';
import React from 'react';
import multiEdit from '../../../../api/multiEdit';
import { IncomingMailState } from '../../../../Types/dataIncoming';
import { enqueueSnackbar } from 'notistack';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import IncomingCourtMailColumns from '../../Columns/IncomingCourtMail';
import { keyBy } from 'lodash';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { DatePicker } from '@mui/x-date-pickers-pro';
import moment from 'moment';

interface MultiEditProps {
  open: boolean;
  onClose: VoidFunction;
  ids: number[];
}

class Cols {
  id: number;
  field: string;
  headerName: string;
  type: 'string' | 'boolean' | 'number' | 'date';
}

const columns: Cols[] = [
  {
    id: 0,
    field: 'id',
    headerName: ' ID записи',
    type: 'string',
  },
  {
    id: 1,
    headerName: 'Номер типа документа',
    type: 'number',
    field: 'type_of_document_id',
  },
  {
    headerName: 'Наименование типа документа',
    type: 'string',
    id: 2,
    field: 'type_of_document_name',
  },
  {
    id: 3,
    field: 'date_post',
    headerName: ' Дата поступления',
    type: 'date',
  },
  {
    id: 4,
    field: 'otprav',
    headerName: ' Отправитель',
    type: 'string',
  },
  {
    id: 5,
    field: 'reestr',
    headerName: ' Реестр',
    type: 'string',
  },
  {
    id: 6,
    field: 'doc_name',
    headerName: ' Название документа',
    type: 'string',
  },
  {
    id: 7,
    field: 'gd',
    headerName: ' ГД - Гражданское дело',
    type: 'string',
  },
  {
    id: 8,
    field: 'fio_dol',
    headerName: ' ФИО должника',
    type: 'string',
  },
  {
    id: 9,
    field: 'ispol_zadach',
    headerName: ' Исполнитель задачи',
    type: 'string',
  },
  {
    id: 10,
    field: 'vsisk',
    headerName: ' ФИО взыскателя',
    type: 'string',
  },
  {
    id: 11,
    field: 'kogda_otdano',
    headerName: ' Когда обработано',
    type: 'date',
  },
  {
    id: 12,
    field: 'kto_obrabotal',
    headerName: ' Кто обработал',
    type: 'string',
  },
  {
    id: 13,
    field: 'id_kto_obrabotal',
    headerName: 'Кто обработал',
    type: 'string',
  },
  {
    id: 14,
    field: 'check_vsisk',
    headerName: ' Проверено взыскателем',
    type: 'boolean',
  },
  {
    id: 15,
    field: 'check_vsisk_name',
    headerName: 'Кем проверено',
    type: 'string',
  },
  {
    id: 16,
    field: 'adress',
    headerName: ' Откуда',
    type: 'string',
  },
  {
    id: 17,
    field: 'mail',
    headerName: ' На какую почту',
    type: 'string',
  },
  {
    id: 18,
    field: 'task',
    headerName: 'Задача',
    type: 'string',
  },
];

interface NumberCustomProps {
  onChange: (args: { target: { name: string; value: string } }) => void;
  name: string;
}
const NumberFormatCustom = React.forwardRef<
  HTMLInputElement,
  NumberCustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, name, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: name,
            value: values.value,
          },
        });
      }}
      thousandSeparator=" "
      decimalSeparator=","
      decimalScale={2}
      isAllowed={({ floatValue }) => {
        if (floatValue && 0 <= floatValue && floatValue <= 10000000) {
          return true;
        } else {
          if (floatValue === undefined) {
            return true;
          }
          return false;
        }
      }}
      suffix="р"
    />
  );
}) as unknown as React.ElementType<InputBaseComponentProps>;

class Interface {
  key: string;
}

export default function MultiEdit({ open, onClose, ids }: MultiEditProps) {
  const [key, setKey] = React.useState<string>('');
  const [multiEditValue, setMultiEditValue] = React.useState<
    string | number | boolean | Date | null
  >();
  const typeString = (type: string) =>
    type === 'string'
      ? 'Строка'
      : type === 'boolean'
      ? 'Лог.значение'
      : type === 'date'
      ? 'Дата'
      : type === 'number'
      ? 'Номер'
      : 'Неизвестно';

  function SelectGroup() {
    const [valueKey, setValueKey] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
      const value = event.target.value as string;
      const key = columns.filter((item) => item.field === value)[0].type;
      setValueKey(value);
      setKey(key);
    };

    const ConditionElement = () => {
      const label = `Новое значение типом: "${typeString(key)}"`;
      const onChange = (event: React.ChangeEvent<any> | unknown) => {
        //@ts-ignore
        const value = event.target.value;
        setMultiEditValue(value);
      };
      if (key === 'string') {
        return (
          <TextField
            fullWidth
            label={label}
            value={multiEditValue}
            onChange={(event) => onChange(event)}
          />
        );
      } else if (key === 'boolean') {
        return (
          <Checkbox
            value={multiEditValue}
            onChange={(event) => {
              onChange(event);
            }}
          />
        );
      } else if (key === 'number') {
        return (
          <TextField
            fullWidth
            label={label}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            value={multiEditValue}
            onChange={(event) => onChange(event)}
          />
        );
      } else if (key === 'date') {
        return (
          <DatePicker
            value={moment(multiEditValue as Date)}
            onChange={(event) => onChange(event)}
            label={label}
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
          />
        );
      }
      return <></>;
    };

    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="key_id">Ключ</InputLabel>
              <Select
                labelId="key_id"
                id="key"
                value={valueKey}
                label="Ключ"
                onChange={handleChange}
              >
                {columns.map((column) => (
                  <MenuItem
                    key={column.id}
                    value={column.field}
                    onClick={(event) => {
                      //@ts-ignore
                      const selectedItem = event.target.dataset.value as string;
                      const selectedType = columns.filter(
                        (item) => item.field === selectedItem,
                      )[0].type;
                      setValueKey(selectedType);
                    }}
                  >
                    {`${column.headerName} "Тип поля": ${typeString(
                      column.type,
                    )}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <ConditionElement />
          </Grid>
        </Grid>
      </>
    );
  }
  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullWidth>
      <DialogTitle align="center">{`Мульти-редактирование. Строк на редактирование: ${ids.length}`}</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container rowGap={1}>
          <Grid item xs={12}>
            <SelectGroup />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions>
        {multiEditValue ? (
          <Grid>
            <Button
              onClick={() => {
                multiEdit({
                  ids,
                  key: key as keyof IncomingMailState,
                  value: multiEditValue,
                });
              }}
            >{`Применить изменения`}</Button>
          </Grid>
        ) : (
          <></>
        )}
      </DialogActions>
    </Dialog>
  );
}
