import React from 'react';
import { DataGridEvents, DataGridEventsEnum } from '../DataGrid';

interface TypeDialogProps {
  DialogTarget: EventTarget;
}

export default function UseTypeDialog({ DialogTarget }: TypeDialogProps) {
  const [openTypeDialog, setOpenTypeDialog] = React.useState(false);
  const [incomingId, setIncomingId] = React.useState<number>(0);

  React.useEffect(() => {
    const callback = ((event: DataGridEvents) => {
      setIncomingId(event.value as number);
      setOpenTypeDialog(true);
    }) as EventListener;
    DialogTarget.addEventListener(DataGridEventsEnum.OpenTypeDialog, callback);
    return () =>
      DialogTarget.removeEventListener(
        DataGridEventsEnum.OpenTypeDialog,
        callback,
      );
  }, []);

  const handleCloseTypeDialog = () => {
    setIncomingId(0);
    setOpenTypeDialog(false);
  };
  return { openTypeDialog, incomingId, handleCloseTypeDialog };
}
