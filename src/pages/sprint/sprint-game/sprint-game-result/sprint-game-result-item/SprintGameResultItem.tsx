import { ReactComponent as AudioIcon } from '../../../../../svg/audio.svg';
import { SprintGameAnswer } from '../../../../../interfaces';
import styles from './../sprint-game-result.module.scss';

type Props = {
  answer: SprintGameAnswer;
};

const SprintGameResultItem = ({ answer }: Props) => {
  return (
    <div className={styles.answer}>
      <AudioIcon className={styles.icon} onClick={() => console.log(answer.audio)} />
      <p>{answer.word}</p>
      <span>-</span>
      <p>{answer.wordTranslate}</p>
    </div>
  );
};

export default SprintGameResultItem;
