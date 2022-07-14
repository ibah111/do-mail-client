import { Button, TextField } from '@mui/material';
import React from 'react';
import addUser from '../../../api/addUser';
const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};
interface RightAddProps {
  refresh: () => void;
}
export default function UserAdd({ refresh }: RightAddProps) {
  const [login, setLogin] = React.useState('');
  const [login_checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    if (validateEmail(login)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [login]);
  return (
    <>
      <TextField
        label="Логин"
        variant="standard"
        size="small"
        error={!login_checked}
        required
        onChange={(event) => {
          setLogin(event.target.value);
        }}
        value={login}
      />
      {login_checked && (
        <Button
          onClick={() => {
            addUser(login).then(() => refresh());
          }}
          size="small"
        >
          Добавить
        </Button>
      )}
    </>
  );
}
