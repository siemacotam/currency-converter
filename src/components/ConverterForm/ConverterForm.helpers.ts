import { currencies } from 'src/global';
import { CantorValues } from './ConverterForm.types';

export const formValidation = ({ amount, from }: CantorValues): string | undefined => {
  if (amount < 1) return 'Min value is 1';

  const limit = currencies.find((currency) => currency.currency === from);

  if (limit) {
    const isOverLimit = amount > limit.limit;

    if (isOverLimit) return `Sending limit for ${from} is ${limit.limit} ${limit.sign}`;
  }
};
