import { useEffect, useState } from 'react';
import { SprintGameAnswer } from '../../../../interfaces';
import GameResultSection from './game-result-section';
import SprintGameResultItem from './sprint-game-result-item';
import styles from './sprint-game-result.module.scss';

type Props = {
  answers: SprintGameAnswer[];
};

const SprintGameResult = ({ answers }: Props) => {
  const [trueAnswers, setTrueAnswers] = useState<SprintGameAnswer[]>([]);
  const [falseAnswers, setFalseAnswers] = useState<SprintGameAnswer[]>([]);
  const [audio, setAudio] = useState<null | string>(null);

  useEffect(() => {
    if (answers.length) {
      setTrueAnswers(answers.filter(({ isCorrectAnswer }) => isCorrectAnswer));
      setFalseAnswers(answers.filter(({ isCorrectAnswer }) => !isCorrectAnswer));
    }
  }, [answers]);

  return (
    <main>
      <div className={styles.box}>
        <h4 className={styles.title}>Результаты</h4>
        <GameResultSection filtredAnswers={trueAnswers} isTrueAnswers={true} />
        <GameResultSection filtredAnswers={falseAnswers} isTrueAnswers={false} />
      </div>
    </main>
  );
};

export default SprintGameResult;
