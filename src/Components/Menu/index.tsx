import { Box, Button, Collapse, Grid, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
interface Page {
  name: string;
  path: string;
}
type Pages = Page[];
const pages: Pages = [
  { name: "Главная", path: "/" },
  { name: "Входящая почта", path: "/incoming" },
  { name: "Админ", path: "/admin" },
];
export default function Menu() {
  const location = useLocation();
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
          ))}
        </Grid>
      </Box>
    </>
  );
}
