import { useMemo, useState } from 'react';
import { ITextbookWord } from '../interfaces';

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

interface IStep {
  word: string;
  translate: string;
  isTrue: boolean;
}

const useSprintGameStep = () => {
  const [sprintStep, setSprintStep] = useState<null | IStep>(null);

  const setStepOfSprintGameByWords = useMemo(
    () => (wordIndex: number, words: ITextbookWord[]) => {
      const { word, wordTranslate } = words[wordIndex];
      let translate = wordTranslate;
      const isTrue = Boolean(getRandomInt(0, 2));
      if (!isTrue) {
        const randomIndex = getRandomIntWithoutCurrent(wordIndex, 0, 20);
        const { wordTranslate: fakeWordTranslate } = words[randomIndex];
        translate = fakeWordTranslate;
      }

      setSprintStep({
        word,
        translate,
        isTrue,
      });
    },
    []
  );

  return {
    sprintStep,
    setStepOfSprintGameByWords,
  };
};

export default useSprintGameStep;
