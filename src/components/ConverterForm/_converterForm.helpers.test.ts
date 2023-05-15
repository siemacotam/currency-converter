import { formValidation, getData } from 'src/components/ConverterForm/ConverterForm.helpers';
import { initialFormValues } from './ConverterForm.const';

const passedValidation = { ...initialFormValues };

const eurOverLimit = {
  ...initialFormValues,
  amount: 1000000
};

const noValue = {
  ...initialFormValues,
  amount: 0
};

describe('form validation function', () => {
  it('should return empty string', () => {
    const result = formValidation(passedValidation);

    expect(result).toBe(undefined);
  });
  it('should inform that amount is over limit', () => {
    const result = formValidation(eurOverLimit);

    expect(result).toBe('Sending limit for EUR is 5000 €');
  });
  it('should inform that amount is too low', () => {
    const result = formValidation(noValue);

    expect(result).toBe('Amount has to be more than 0');
  });
});

const initValues = { ...initialFormValues, amount: 12, toAmount: 100 };

describe('getData function', () => {
  it('should return undefined', async () => {
    const result = await getData(initialFormValues, (msg: string) => {}, true);

    expect(result).toBe(undefined);
  });
  it('should return amount diffrent than earlier', async () => {
    const result = await getData(initValues, (msg: string) => {}, true);

    expect(result?.amount).not.toBe(initValues.amount);
  });
  it('should return the same amount', async () => {
    const result = await getData(initValues, (msg: string) => {});

    expect(result?.amount).toBe(initValues.amount);
  });
});
