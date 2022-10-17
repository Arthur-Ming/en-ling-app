import { useEffect, useMemo, useState } from 'react';
import { SprintGameStep, ITextbookWord } from '../../interfaces';

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

function shuffle<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [array[i], array[j]] = [array[j], array[i]];
  }
}
const createSprintStepsByWords = (words: ITextbookWord[]) =>
  words.map(({ id, word, wordTranslate, audio }, index) => {
    const isTrue = Boolean(getRandomInt(0, 2));
    let translate = wordTranslate;
    if (!isTrue) {
      const randomIndex = getRandomIntWithoutCurrent(index, 0, 20);
      const { wordTranslate: fakeWordTranslate } = words[randomIndex];
      translate = fakeWordTranslate;
    }
    return {
      id,
      word,
      mockWordTranslate: translate,
      wordTranslate,
      audio,
      isTrue,
    };
  });

const createShuffledSprintStepsByWords = (words: ITextbookWord[]) => {
  const steps = createSprintStepsByWords(words);
  shuffle(steps);
  return steps;
};

const useSprintGameStep = (words: ITextbookWord[] | null) => {
  const [sprintSteps, setSprintSteps] = useState<null | SprintGameStep[]>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [sprintStep, setSprintStep] = useState<null | SprintGameStep>(null);
  const [stepsOver, setStepsOver] = useState<boolean>(false);

  useEffect(() => {
    if (words) {
      setSprintSteps(createShuffledSprintStepsByWords(words));
      setStepsOver(false);
    }
  }, [words]);

  useEffect(() => {
    if (sprintSteps !== null && !stepsOver) {
      const step = sprintSteps[currentStepIndex];
      step !== undefined && setSprintStep(step);
    }
  }, [currentStepIndex, sprintSteps, stepsOver]);

  useEffect(() => {
    if (words && currentStepIndex === words.length) {
      setStepsOver(true);
    }
  }, [currentStepIndex, words]);

  useEffect(() => {
    if (stepsOver) {
      setSprintSteps(null);
      setSprintStep(null);
      setCurrentStepIndex(0);
    }
  }, [stepsOver]);

  const getNextStep = useMemo(
    () => () => setCurrentStepIndex((prevStepIndex) => prevStepIndex + 1),
    []
  );

  return {
    sprintStep,
    getNextStep,
    stepsOver,
  };
};

export default useSprintGameStep;
