import { Grid, InputAdornment, Stack, TextField, Typography, Box, styled } from '@mui/material';
import { useFormikContext } from 'formik';
import { CantorValues } from '../ConverterForm.types';
import { convertInfo } from '../ConverterForm.const';

const StyledDot = styled(Box)`
  height: 10px;
  width: 10px;
  border: 3px solid #cccc00;
  border-radius: 50%;
`;

interface ConvertedPanelProps {
  handleChange: (values: CantorValues, reverse?: boolean) => Promise<void>;
}

export const ConvertedPanel = ({ handleChange }: ConvertedPanelProps) => {
  const { values, setFieldValue } = useFormikContext<CantorValues>();

  const { toAmount, from, to, rate } = values;

  return (
    <>
      <Grid item xs={2} />
      <Grid item xs={5}>
        <TextField
          fullWidth
          label="Converted to"
          type="number"
          value={toAmount}
          name="toAmount"
          onChange={(e) => {
            if (Number(e.target.value) < 0) return;
            handleChange(
              {
                ...values,
                toAmount: Number(e.target.value)
              },
              true
            );
          }}
          onBlur={(e) => {
            setFieldValue('toAmount', parseFloat(e.target.value).toFixed(2));
          }}
          variant="standard"
          InputProps={{
            endAdornment: <InputAdornment position="end">{to}</InputAdornment>
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" spacing={1} my={2}>
          <StyledDot />
          <Typography fontWeight="500">
            1{from} = {rate} {to}
          </Typography>
        </Stack>
        <Typography variant="caption" component="span">
          {convertInfo}
        </Typography>
      </Grid>
    </>
  );
};
