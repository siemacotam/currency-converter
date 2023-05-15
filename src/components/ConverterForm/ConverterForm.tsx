import {
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useFormik, FormikProvider, Form } from 'formik';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { AlertMessage } from 'src/components';
import { CantorValues } from './ConverterForm.types';
import { initialFormValues } from './ConverterForm.const';
import { formValidation } from './ConverterForm.helpers';
import { useState } from 'react';
import { currencies } from 'src/global';

export const ConverterForm = () => {
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const formik = useFormik<CantorValues>({
    initialValues: initialFormValues,
    onSubmit: async (values) => {
      if (message) return;
      console.log(values);
    }
  });

  const handleValidate = (values: CantorValues) => {
    const validation = formValidation(values);
    if (validation) {
      setMessage(validation);
      return;
    }
    setMessage('');
  };

  const {
    handleChange,
    values: { from, to, amount, converted }
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit} id="carAddForm">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={5}>
              <Box>
                <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
                  <InputLabel>From</InputLabel>
                  <Select
                    value={from}
                    onChange={handleChange}
                    onBlur={() => handleValidate(formik.values)}
                    label="From"
                    name="from"
                  >
                    {currencies.map(({ code, currency }) => (
                      <MenuItem key={currency} value={currency}>
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
              </Box>
            </Grid>
            <Grid item xs={2} container justifyContent="center" alignItems="center">
              <SwapHorizIcon sx={{ fontSize: '30px', color: theme.palette.primary.main }} />
            </Grid>
            <Grid item xs={5}>
              <Box>
                <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
                  <InputLabel>To</InputLabel>
                  <Select value={to} onChange={handleChange} label="To" name="to">
                    {currencies.map(({ code, currency }) => (
                      <MenuItem value={currency}>
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
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Amount:"
              type="number"
              name="amount"
              value={amount}
              onChange={handleChange}
              onBlur={(e) => {
                handleValidate(formik.values);
                formik.setFieldValue('amount', parseFloat(e.target.value).toFixed(2));
              }}
              variant="standard"
              InputProps={{
                endAdornment: <InputAdornment position="end">{to}</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {message && <AlertMessage message={message} />}
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" type="submit" color="success">
              Convert
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};
