import {
  Button,
  Card,
  Grid,
  InputAdornment,
  Select,
  TextField,
  useTheme,
  InputLabel,
  FormControl,
  MenuItem,
  Box,
  Typography
} from '@mui/material';
import { useFormik, FormikProvider, Form } from 'formik';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { AlertMessage } from 'src/components';
import { CantorValues } from './ConverterForm.types';
import { initialFormValues } from './ConverterForm.const';
import { formValidation, getData } from './ConverterForm.helpers';
import { useState } from 'react';
import { currencies } from 'src/global';
import { ConvertedPanel } from './components/_ConvertedPanel';

export const ConverterForm = () => {
  const [message, setMessage] = useState('');

  const setAlertMessage = (msg: string) => setMessage(msg);
  const theme = useTheme();

  const formik = useFormik<CantorValues>({
    initialValues: initialFormValues,
    onSubmit: async (values) => {
      if (message) return;

      const data = await getData(values, setAlertMessage);
      if (data) {
        formik.setValues(data);
      }
    }
  });

  const handleChange = async (values: CantorValues, reverse?: boolean) => {
    setMessage('');
    const validation = formValidation(values);

    if (validation) {
      setMessage(validation);
      return;
    }

    if (message) return;
    formik.setValues(values);

    if (toAmount && rate) {
      await getData(values, setAlertMessage, reverse).then((res) => {
        if (res) {
          formik.setValues(res);
        }
      });
    }
  };

  const {
    values: { from, to, amount, toAmount, rate }
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit} id="carAddForm">
        <Card elevation={20} sx={{ p: 7 }}>
          <Grid container alignItems="center" rowGap={2}>
            <Grid item xs={5}>
              <FormControl fullWidth variant="standard">
                <InputLabel>From</InputLabel>
                <Select
                  value={from}
                  onChange={(e) => {
                    handleChange({ ...formik.values, from: e.target.value });
                  }}
                  label="From"
                  name="from"
                >
                  {currencies
                    .filter((currency) => currency.currency !== to)
                    .map(({ code, currency }) => (
                      <MenuItem
                        key={currency}
                        value={currency}
                        sx={{
                          borderBottom: `1px solid ${theme.palette.grey[300]}`
                        }}
                      >
                        <Box>
                          <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${code}.png`}
                            srcSet={`https://flagcdn.com/w40/${code}.png 2x`}
                            alt=""
                          />
                          <Typography component="span" ml={2}>
                            {currency}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2} container justifyContent="center" alignItems="center">
              <SwapHorizIcon sx={{ fontSize: '30px', color: theme.palette.primary.main }} />
            </Grid>
            <Grid item xs={5}>
              <FormControl fullWidth variant="standard">
                <InputLabel>To</InputLabel>
                <Select
                  value={to}
                  onChange={(e) => {
                    handleChange({ ...formik.values, to: e.target.value });
                  }}
                  label="To"
                  name="to"
                >
                  {currencies
                    .filter((currency) => currency.currency !== from)
                    .map(({ code, currency }) => (
                      <MenuItem
                        key={currency}
                        value={currency}
                        sx={{
                          borderBottom: `1px solid ${theme.palette.grey[300]}`
                        }}
                      >
                        <Box>
                          <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${code}.png`}
                            srcSet={`https://flagcdn.com/w40/${code}.png 2x`}
                            alt=""
                          />
                          <Typography component="span" ml={2}>
                            {currency}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={toAmount ? 5 : 12}>
              <TextField
                fullWidth
                label="Amount:"
                type="number"
                name="amount"
                value={amount}
                onChange={async (e) => {
                  if (Number(e.target.value) < 0) return;
                  handleChange({
                    ...formik.values,
                    amount: Number(e.target.value)
                  });
                }}
                onBlur={(e) => {
                  formik.setFieldValue('amount', parseFloat(e.target.value).toFixed(2));
                }}
                variant="standard"
                InputProps={{
                  endAdornment: <InputAdornment position="end">{from}</InputAdornment>
                }}
              />
            </Grid>
            {toAmount && rate && <ConvertedPanel handleChange={handleChange} />}
            <Grid item xs={12}>
              {message && <AlertMessage message={message} />}
            </Grid>
            {!toAmount && (
              <Grid item xs={12}>
                <Button
                  disabled={formik.isSubmitting || Boolean(message)}
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{ bgcolor: '#4ee44e', py: 2 }}
                >
                  Convert
                </Button>
              </Grid>
            )}
          </Grid>
        </Card>
      </Form>
    </FormikProvider>
  );
};
