import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import addArhive from '../../../../api/addArhive';
import { ArhiveType } from '../../../../Types/dataIncoming';

export default function AddArhive() {
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
        <MenuItem onClick={sendArhive(ArhiveType.ARHIVE)}>Документы</MenuItem>
        <MenuItem onClick={sendArhive(ArhiveType.ARHIVE_LAW_EXEC)}>
          Исполнительные документы
        </MenuItem>
      </Menu>
    </>
  );
}
