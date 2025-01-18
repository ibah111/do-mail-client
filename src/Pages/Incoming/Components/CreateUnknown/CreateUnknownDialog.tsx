import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputBaseComponentProps,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers-pro';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import createUnknown from '../../../../api/createUnknown';
import moment from 'moment';

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
      decimalScale={1}
      allowNegative={false}
      isAllowed={({ floatValue }) => {
        if (floatValue && 0 <= floatValue && floatValue <= 100) {
          return true;
        } else {
          if (floatValue === undefined) {
            return true;
          }
          return false;
        }
      }}
    />
  );
}) as unknown as React.ElementType<InputBaseComponentProps>;

interface CreateUnknownProps {
  open: boolean;
  onClose: VoidFunction;
}
export default function CreateUnknownDialog({
  open,
  onClose,
}: CreateUnknownProps) {
  const [count, setCount] = React.useState(1);
  const [date_post, setDate_post] = React.useState<Date>(new Date());
  const [otprav, setOtprav] = React.useState<string>('');
  const [doc_name, setDoc_name] = React.useState('');
  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth={'md'} fullWidth>
        <DialogTitle>Добавить неопознанное</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item>
              <TextField
                label={'Имя документа (doc_name)'}
                value={doc_name}
                onChange={(event) => {
                  const value = event.target.value;
                  setDoc_name(value);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label={'Отправитель (otprav)'}
                value={otprav}
                onChange={(event) => {
                  const value = event.target.value;
                  setOtprav(value);
                }}
              />
            </Grid>
            <Grid item>
              <DatePicker
                onChange={(value) => {
                  if (value) setDate_post(value.toDate());
                }}
                value={moment(date_post)}
                label={'Дата (date_post)'}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label={'Испол.задачи (ispol_zadach)'}
                value={'НЕ ОПОЗНАНО'}
                disabled
              />
            </Grid>
            <Grid item>
              <TextField
                value={count}
                label={'Кол-во'}
                fullWidth
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                onChange={(event) => {
                  setCount(Number(event.target.value));
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            onClick={() => {
              createUnknown({
                count,
                date: date_post,
              });
            }}
          >{`Создать`}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
