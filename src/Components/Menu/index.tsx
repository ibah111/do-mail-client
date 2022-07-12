import { Box, Button, Collapse, Grid } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import getAllow, { AllowFunction } from "../../hooks/getAllow";
interface Page {
  name: string;
  path: string;
  allow: boolean;
}
type Pages = Page[];
const usePages = (isAllow: AllowFunction): Pages => [
  { name: "Главная", path: "/", allow: true },
  { name: "Входящая почта", path: "/incoming", allow: true },
  { name: "Админ", path: "/admin", allow: isAllow("admin") },
];
export default function Menu() {
  const location = useLocation();
  const pages = usePages(getAllow());
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {pages.map(
            (page, index) =>
              page.allow && (
                <Collapse
                  unmountOnExit
                  mountOnEnter
                  orientation="horizontal"
                  key={index}
                  in={location.pathname !== page.path}
                >
                  <Grid xs="auto" item>
                    <Button
                      sx={{ whiteSpace: "nowrap" }}
                      component={Link}
                      to={page.path}
                      variant="text"
                    >
                      {page.name}
                    </Button>
                  </Grid>
                </Collapse>
              )
          )}
        </Grid>
      </Box>
    </>
  );
}
