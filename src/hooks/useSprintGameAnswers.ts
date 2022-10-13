import { useEffect, useMemo, useState } from 'react';
import { ITextbookWord } from '../interfaces';

const useSprintGameAnswers = () => {
  const [trueAnswers, setTrueAnswers] = useState<ITextbookWord[]>([]);
  const [falseAnswers, setFalseAnswers] = useState<ITextbookWord[]>([]);

  const addAnswer = useMemo(
    () => (isAnswerTrue: boolean, answer: ITextbookWord) => {
      isAnswerTrue
        ? setTrueAnswers((prevAnswers) => [...prevAnswers, answer])
        : setFalseAnswers((prevAnswers) => [...prevAnswers, answer]);
    },
    []
  );

  useEffect(() => {
    console.log(trueAnswers);
    console.log(falseAnswers);
  }, [falseAnswers, trueAnswers]);

  return {
    addAnswer,
    answers: {
      trueAnswers,
      falseAnswers,
    },
  };
};
export default useSprintGameAnswers;
