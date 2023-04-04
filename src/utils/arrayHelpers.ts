import { shuffle } from './random';

export const createArr = (length: number, shift = 0): number[] =>
  Array.from(Array(length), (_, index) => index + shift);

export const createShuffledArr = (range: number[]): number[] => {
  const arr = createArr(range[1] - range[0] + 1, range[0]);
  shuffle<number>(arr);
  return arr;
};

type ArrToMapType = <T extends object>(arr: T[], key: keyof T) => { [key: string]: T };

export const arrToMap: ArrToMapType = (arr, key) => {
  return arr.reduce((acc, item) => ({ ...acc, [String(item[key])]: item }), {});
};
