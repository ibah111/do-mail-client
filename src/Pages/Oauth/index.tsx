import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import getToken from '../../api/getToken';
import disableMenu from '../../hooks/disableMenu';
import { ping } from '../../lib/ping';

export default function Oauth() {
  disableMenu();
  const [available, setAvailable] = React.useState(false);
  React.useEffect(() => {
    ping('http://localhost:11711').then((res) => {
      if (res) {
        setAvailable(true);
      } else {
        setAvailable(false);
      }
    });
  }, []);
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h3">
          Авторизация в приложении DocumentAdder
        </Typography>
      </Grid>
      <Grid item>
        {available ? (
          <Button
            onClick={async () => {
              const token = await getToken();
              location.replace('http://localhost:11711/login?token=' + token);
            }}
          >
            Разрешить
          </Button>
        ) : (
          <Typography>
            Авторизация недоступна, программа не в режиме авторизации
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
