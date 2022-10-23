import { shuffle } from './random';

export const createArr = (num: number): number[] => Array.from(Array(num), (_, index) => index);

export const createShuffledArr = (num: number): number[] => {
  const arr = createArr(num);
  shuffle<number>(arr);
  return arr;
};

interface P {
  id: string;
}

type ArrToMapType = <T extends P>(arr: T[]) => { [id: string]: T };

export const arrToMap: ArrToMapType = (arr) => {
  return arr.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
};
