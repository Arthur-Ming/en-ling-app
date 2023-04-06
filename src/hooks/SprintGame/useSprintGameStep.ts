import { useCallback, useEffect, useState } from 'react';
import { SprintGameStep, IWord } from '../../interfaces';
import { getRandomInt, getRandomIntWithoutCurrent, shuffle } from '../../utils/random';

const createSprintStepsByWords = (words: IWord[]) =>
  words.map(({ id, word, wordTranslate, audio }, index) => {
    const isTrue = Boolean(getRandomInt(0, 2));
    let mockTranslate = wordTranslate;
    if (!isTrue) {
      const randomIndex = getRandomIntWithoutCurrent(index, 0, 20);
      const { wordTranslate: fakeWordTranslate } = words[randomIndex];
      mockTranslate = fakeWordTranslate;
    }
    return {
      id,
      word,
      mockTranslate,
      wordTranslate,
      audio,
    };
  });

const createShuffledSprintStepsByWords = (words: IWord[]) => {
  const steps = createSprintStepsByWords(words);
  shuffle(steps);
  return steps;
};

const useSprintGameStep = (words: IWord[] | undefined) => {
  const [sprintSteps, setSprintSteps] = useState<null | SprintGameStep[]>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [sprintStep, setSprintStep] = useState<null | SprintGameStep>(null);
  const [stepsOver, setStepsOver] = useState<boolean>(false);

  useEffect(() => {
    if (words) {
      console.log(words);
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
      setSprintSteps(null);
      setSprintStep(null);
      setCurrentStepIndex(0);
    }
  }, [currentStepIndex, words]);

  const getNextStep = useCallback(() => {
    setCurrentStepIndex((s) => s + 1);
  }, []);

  return {
    sprintStep,
    stepsOver,
    getNextStep,
  };
};

export default useSprintGameStep;
