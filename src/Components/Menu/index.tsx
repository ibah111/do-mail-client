import { useAbility } from '@casl/react';
import { Box, Button, Collapse, Grid } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { AbilityContext, Can } from '../../Context/Ability';
import { usePages } from '../../utils/pages';

export default function Menu() {
  const location = useLocation();
  const ability = useAbility(AbilityContext);
  const pages = usePages(ability);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {pages.map((page, index) => (
            <Can key={index} I={page.right} a={page.subject}>
              <Collapse
                unmountOnExit
                mountOnEnter
                orientation="horizontal"
                in={location.pathname !== page.path}
              >
                <Grid xs="auto" item>
                  <Button
                    sx={{ whiteSpace: 'nowrap' }}
                    component={Link}
                    to={page.path}
                    variant="text"
                  >
                    {page.name}
                  </Button>
                </Grid>
              </Collapse>
            </Can>
          ))}
        </Grid>
      </Box>
    </>
  );
}
