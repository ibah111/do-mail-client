import React from 'react';
import { DataGridEvents, DataGridEventsEnum } from '../../DataGrid';
import { useAppDispatch } from '../../../../Reducer';
import { setReload } from '../../../../Reducer/Stater';

interface MultiEditControlProps {
  DialogTarget: EventTarget;
}

export default function MultiEditControl({
  DialogTarget,
}: MultiEditControlProps) {
  const [open, setOpen] = React.useState(false);
  const [ids, setIds] = React.useState<number[]>([]);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const callback = ((e: DataGridEvents) => {
      setIds(e.value as number[]);
      setOpen(true);
    }) as EventListener;
    DialogTarget.addEventListener(
      DataGridEventsEnum.OpenMultiEditDialog,
      callback,
    );
  }, []);
  const handleClose = () => {
    setOpen(false);
    setIds([]);
    dispatch(setReload(true));
  };
  return {
    open,
    handleClose,
    ids,
  };
}
