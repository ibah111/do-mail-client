import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import React from 'react';

interface MultiEditProps {
  open: boolean;
  onClose: VoidFunction;
  ids: number[];
}

export default function MultiEdit({ open, onClose, ids }: MultiEditProps) {
  const [element, setElements] = React.useState([]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{`Мульти-редактирование.`}</DialogTitle>
      <DialogContent>
        <Grid container></Grid>
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Button onClick={() => {}}>Применить изменения</Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
