import { currencies } from 'src/global';
import { CantorValues } from './ConverterForm.types';
import convertService from 'src/services/convert-service';

export const formValidation = ({ amount, from, toAmount }: CantorValues): string | undefined => {
  if (amount <= 0) return 'Amount has to be more than 0';

  const limit = currencies.find((currency) => currency.currency === from);

  if (limit) {
    const isOverLimit = amount > limit.limit;

    if (isOverLimit) return `Sending limit for ${from} is ${limit.limit} ${limit.sign}`;
  }
};

export const getData = async (
  values: CantorValues,
  setAlertMessage: (msg: string) => void,
  reverse?: boolean
) => {
  try {
    if (reverse && !values.toAmount) {
      setAlertMessage('Something went wrong. Please try again');
      return;
    }

    const initValues = reverse
      ? {
          ...values,
          from: values.to,
          to: values.from,
          amount: Number(values.toAmount)
        }
      : values;

    const res = await convertService.getConvertedAmount(initValues);

    if (res) {
      const data = reverse
        ? { ...values, amount: res.toAmount, toAmount: res.fromAmount, rate: res.rate }
        : { ...values, amount: res.fromAmount, toAmount: res.toAmount, rate: res.rate };
      return data;
    }
  } catch (error) {
    setAlertMessage('Something went wrong. Please try again');
  }
};
