import { CssBaseline, Grid } from '@mui/material';
import { SwitchModeButton } from 'src/components';
import { Converter } from 'src/pages';

function App() {
  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
      <CssBaseline />
      <SwitchModeButton />
      <Grid item xs={11} md={6} height="60vh">
        <Converter />
      </Grid>
    </Grid>
  );
}

export default App;
