import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import addArhive from '../../../../api/addArhive';
import { ArhiveState } from '../../../../Reducer/Stater';

export default function AddArhive() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const sendArhive = (value: ArhiveState) => () => {
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
        <MenuItem onClick={sendArhive(1)}>Документы</MenuItem>
        <MenuItem onClick={sendArhive(2)}>Исполнительные документы</MenuItem>
      </Menu>
    </>
  );
}
