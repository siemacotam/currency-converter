import { Box, styled } from '@mui/material';
import { CantorValues } from './ConverterForm.types';

export const initialFormValues: CantorValues = {
  from: 'EUR',
  to: 'GBP',
  amount: 1.0,
  rate: null,
  toAmount: null
};

export const convertInfo =
  ' All figures are live mid-market rates, which are for informational purposes only. To see the rates for money transfer, please select sending money option';

export const StyledDot = styled(Box)`
  height: 10px;
  width: 10px;
  border: 3px solid #cccc00;
  border-radius: 50%;
`;
