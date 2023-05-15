import { formValidation } from 'src/components/ConverterForm/ConverterForm.helpers';
import { CantorValues } from 'src/components/ConverterForm/ConverterForm.types';

const passedValidation: CantorValues = {
  from: 'EUR',
  to: 'PLN',
  amount: 100,
  converted: 0
};

const eurOverLimit: CantorValues = {
  from: 'PLN',
  to: 'EUR',
  amount: 1000000,
  converted: 0
};

describe('form validation function', () => {
  it('should return empty string', () => {
    const result = formValidation(passedValidation);

    expect(result).toBe(undefined);
  });
  it('should inform that amount is over limit', () => {
    const result = formValidation(eurOverLimit);

    expect(result).toBe('Sending limit for PLN is 20000 zł');
  });
});
