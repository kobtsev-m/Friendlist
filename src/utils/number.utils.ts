import numeral from 'numeral';

export const fCurrency = (number: number) => {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
};

export const fPercent = (number: number) => {
  return numeral(number / 100).format('0.0%');
};

export const fNumber = (number: number) => {
  return numeral(number).format();
};

export const fShortenNumber = (number: number) => {
  return numeral(number).format('0.00a').replace('.00', '');
};

export const fData = (number: number) => {
  return numeral(number).format('0.0 b');
};
