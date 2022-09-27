import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import removeFunction from '../../api/removeFunction';
import MaskNumber from '../../Components/MaskNumber';
export default function Remove() {
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (value && value.slice(-1) !== ',') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [value]);
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid xs={3} item>
          <TextField
            variant="standard"
            label="Введите список"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            fullWidth
            helperText="Введите список через запятую"
            InputProps={{ inputComponent: MaskNumber as any }}
          />
        </Grid>
        {open && (
          <Button
            onClick={() => {
              removeFunction(
                value
                  .replaceAll(' ', '')
                  .split(',')
                  .map((value) => Number(value)),
              );
            }}
          >
            Удалить
          </Button>
        )}
      </Grid>
    </>
  );
}
