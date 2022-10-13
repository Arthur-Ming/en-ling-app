import { useEffect, useState } from 'react';

function shuffle<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const createArr = (num: number): number[] => Array.from(Array(num), (_, index) => index);

function createShuffledArr(num: number): number[] {
  const arr = createArr(num);
  shuffle<number>(arr);
  return arr;
}

function getRandomInt(min = 0, max = 30): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntWithoutCurrent(current: number, min = 0, max = 30): number {
  let randomInt = getRandomInt(min, max);

  while (randomInt === current) {
    randomInt = getRandomInt(min, max);
  }

  return randomInt;
}

const useSprintGameRandom = () => {
  const [shuffledPagesArr, setShuffledPagesArr] = useState<null | number[]>(null);
  const [shuffledWordsArr, setShuffledWordsArr] = useState<null | number[]>(null);

  useEffect(() => {
    setShuffledPagesArr(createShuffledArr(30));
    setShuffledWordsArr(createShuffledArr(20));
  }, []);

  return {
    shuffledPagesArr,
    shuffledWordsArr,
  };
};

export default useSprintGameRandom;
