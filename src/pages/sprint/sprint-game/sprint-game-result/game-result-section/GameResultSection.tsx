import { SprintGameAnswer } from '../../../../../interfaces';
import SprintGameResultItem from '../sprint-game-result-item';
import styles from './../sprint-game-result.module.scss';

type Props = {
  filtredAnswers: SprintGameAnswer[];
  isTrueAnswers: boolean;
};

const GameResultSection = ({ filtredAnswers, isTrueAnswers }: Props) => {
  return (
    <section>
      {isTrueAnswers && (
        <h5>
          Правильные ответы<span>{filtredAnswers.length}</span>
        </h5>
      )}
      {!isTrueAnswers && (
        <h5>
          Не правильные ответы<span>{filtredAnswers.length}</span>
        </h5>
      )}
      <div className={styles.answers}>
        {filtredAnswers.map((answer) => (
          <SprintGameResultItem key={answer.id} answer={answer} />
        ))}
      </div>
    </section>
  );
};

export default GameResultSection;
