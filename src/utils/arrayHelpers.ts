import { shuffle } from './random';

export const createArr = (num: number): number[] => Array.from(Array(num), (_, index) => index);

export const createShuffledArr = (num: number): number[] => {
  const arr = createArr(num);
  shuffle<number>(arr);
  return arr;
};

type ArrToMapType = <T extends object>(arr: T[], key: keyof T) => { [key: string]: T };

export const arrToMap: ArrToMapType = (arr, key) => {
  return arr.reduce((acc, item) => ({ ...acc, [String(item[key])]: item }), {});
};
