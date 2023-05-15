import { Card } from '@mui/material';
import { ConverterForm } from 'src/components';

export const Converter = (): JSX.Element => (
  <Card elevation={20} sx={{ height: '100%', p: 5 }}>
    <ConverterForm />
  </Card>
);
