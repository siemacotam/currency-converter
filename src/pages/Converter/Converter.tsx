import { Grid } from '@mui/material';
import { ConverterForm } from 'src/components';

export const Converter = (): JSX.Element => (
  <Grid item xs={11} sm={7} md={5}>
    <ConverterForm />
  </Grid>
);
