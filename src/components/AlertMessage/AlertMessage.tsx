import { Alert, Grid } from '@mui/material';

interface AlertMessageProps {
  message: string;
}

export const AlertMessage = ({ message }: AlertMessageProps): JSX.Element => (
  <Grid container>
    <Grid item xs={12}>
      <Alert severity="error">{message}</Alert>
    </Grid>
  </Grid>
);
