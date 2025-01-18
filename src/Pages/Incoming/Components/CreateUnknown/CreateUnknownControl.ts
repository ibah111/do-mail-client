import React from 'react';
import { DataGridEvents, DataGridEventsEnum } from '../../DataGrid';
import { useAppDispatch } from '../../../../Reducer';
import { setReload } from '../../../../Reducer/Stater';

interface CreateUnknownControlProps {
  DialogTarget: EventTarget;
}

export default function CreateUnknownControl({
  DialogTarget,
}: CreateUnknownControlProps) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const callback = ((e: DataGridEvents) => {
      setOpen(true);
    }) as EventListener;
    DialogTarget.addEventListener(
      DataGridEventsEnum.OpenCreateUnknownDialog,
      callback,
    );
  }, []);
  const onClose = () => {
    setOpen(false);
    dispatch(setReload(true));
  };
  return {
    open,
    onClose,
  };
}
