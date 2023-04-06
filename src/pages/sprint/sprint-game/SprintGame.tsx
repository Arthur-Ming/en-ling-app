import useSprintGame from '../../../hooks/SprintGame/useSprintGame';
import { DEFAULT_GROUP } from '../../../constants';
import CircleTimer from '../circle-timer';
import SprintGameWords from './sprint-game-words';
import SprintGameButtons from './sprint-game-footer';
import SprintGameHeader from './sprint-game-header';
import styles from './index.module.scss';
import SprintGamePoints from './sprint-game-points';
import SprintGameDotsOfAnswers from './sprint-game-dots';
import SprintGameResult from './sprint-game-result';
import useSprintGameTimer from '../../../hooks/SprintGame/useSprintGameTimer';

interface OwnProps {
  group: number;
  pageRange: number[];
}

type Props = OwnProps;

const SprintGame = ({ group, pageRange }: Props) => {
  const {
    sprintStep,
    wordsLoading,
    wordsLoaded,
    wordsLoadingError,
    onAnswerButtonClick,
    pagesOver,
    gamePoints,
    numberOfContinuousAnswers,
    answers,
  } = useSprintGame(group, pageRange);
  const timer = useSprintGameTimer(wordsLoaded);
  console.log(sprintStep);
  if (pagesOver || timer.isTimeOver)
    return <SprintGameResult answers={answers} points={gamePoints} />;

  return (
    <main className={styles.main}>
      <div className={styles.box}>
        <CircleTimer pause={timer.isPause} onTimeOver={timer.onTimeOver} />
        <div className={styles.content}>
          <SprintGameHeader gamePoints={gamePoints} audio={''} />
          <SprintGameDotsOfAnswers
            numberOfContinuousCorrectAnswers={numberOfContinuousAnswers.correct}
            numberOfContinuousWrongAnswers={numberOfContinuousAnswers.wrong}
          />
          <div className={styles.words}>
            {wordsLoading && <div>Loading...</div>}
            {sprintStep && (
              <SprintGameWords
                word={sprintStep.word}
                mockWordTranslate={sprintStep.mockTranslate}
              />
            )}
          </div>
          <SprintGameButtons onAnswerButtonClick={onAnswerButtonClick} disabled={wordsLoading} />
        </div>
        <SprintGamePoints gamePoints={gamePoints} />
      </div>
    </main>
  );
};

export default SprintGame;
