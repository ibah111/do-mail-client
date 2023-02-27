import { useAbility } from '@casl/react';
import { Box, Button, Collapse, Grid } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Action } from '../../casl/casl.factory';
import { AbilityContext, Can } from '../../Context/Ability';
import { usePages } from '../../utils/pages';
import DarkButton from '../DarkButton';

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
            <Can
              key={index}
              I={page.right || Action.Read}
              a={page.subject || 'all'}
              passThrough
            >
              {(allowed) =>
                (allowed || (!page.right && !page.subject)) &&
                !page.hidden && (
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
                )
              }
            </Can>
          ))}
          <Collapse
            unmountOnExit
            mountOnEnter
            orientation="horizontal"
            in={true}
          >
            <Grid xs="auto" item>
              <DarkButton />
            </Grid>
          </Collapse>
        </Grid>
      </Box>
    </>
  );
}
