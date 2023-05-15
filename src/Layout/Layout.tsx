import { CssBaseline, Grid, Stack } from '@mui/material';
import { Header } from './components';

interface LayoutProps {
  children: JSX.Element;
}

export const Layout = ({ children }: LayoutProps): JSX.Element => (
  <Stack minHeight="100vh">
    <CssBaseline />
    <Header />
    <Grid
      flexGrow={1}
      container
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 40px)"
    >
      {children}
    </Grid>
  </Stack>
);
