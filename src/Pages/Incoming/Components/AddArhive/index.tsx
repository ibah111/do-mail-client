import { subject } from '@casl/ability';
import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import addArhive from '../../../../api/addArhive';
import { Action, Subject } from '../../../../casl/casl.factory';
import { Can } from '../../../../Context/Ability';
import { ArhiveType, MailType } from '../../../../Types/dataIncoming';
interface AddArhiveProps {
  mail: MailType;
}
export default function AddArhive({ mail }: AddArhiveProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const sendArhive = (value: ArhiveType) => () => {
    addArhive(value);
    handleClose();
  };
  return (
    <>
      <Button size="small" onClick={handleClick}>
        Добавить в архив
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Can
          I={Action.Create}
          this={subject(Subject.DataIncoming, {
            mode: [mail],
            arhive: [ArhiveType.ARHIVE],
          })}
        >
          <MenuItem onClick={sendArhive(ArhiveType.ARHIVE)}>Документы</MenuItem>
        </Can>
        <Can
          I={Action.Create}
          this={subject(Subject.DataIncoming, {
            mode: [mail],
            arhive: [ArhiveType.ARHIVE_LAW_EXEC],
          })}
        >
          <MenuItem onClick={sendArhive(ArhiveType.ARHIVE_LAW_EXEC)}>
            Исполнительные документы
          </MenuItem>
        </Can>
      </Menu>
    </>
  );
}
