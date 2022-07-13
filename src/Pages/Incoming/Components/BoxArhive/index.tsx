import { Box, Button, IconButton, Menu, TextField } from "@mui/material";
import React from "react";
import { Send as SendIcon } from "@mui/icons-material";
import boxArhive from "../../../../api/boxArhive";

export default function AddArhive() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState(0);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button size="small" onClick={handleClick}>
        Короб
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box m={1} sx={{ display: "flex" }} component="form">
          <TextField
            label="Номер короба"
            size="small"
            variant="standard"
            value={value}
            onChange={(event) => {
              setValue(Number(event.target.value));
            }}
            type="number"
          />
          <IconButton
            size="small"
            onClick={(event) => {
              boxArhive(value);
              handleClose();
              setValue(0);
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Menu>
    </>
  );
}
