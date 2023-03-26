import useSprintGame from '../../../hooks/SprintGame/useSprintGame';
import { DEFAULT_GROUP } from '../../../constants';
import CircleTimer from '../circle-timer';
import SprintGameWords from './sprint-game-words';
import SprintGameButtons from './sprint-game-footer';
import SprintGameHeader from './sprint-game-header';
import styles from '../sprint.module.scss';
import SprintGamePoints from './sprint-game-points';
import SprintGameDotsOfAnswers from './sprint-game-dots';
import SprintGameResult from './sprint-game-result';
import useSprintGameTimer from '../../../hooks/SprintGame/useSprintGameTimer';

interface OwnProps {
  level?: number;
}

type Props = OwnProps;

const SprintGame = ({ level = DEFAULT_GROUP }: Props) => {
  const {
    sprintStep,
    wordsLoading,
    wordsLoaded,
    error,
    handlers,
    pagesOver,
    gamePoints,
    numberOfContinuousAnswers,
    answers,
  } = useSprintGame(level);
  const timer = useSprintGameTimer(wordsLoaded);
  console.log('sprintgame');
  if (pagesOver || timer.isTimeOver)
    return <SprintGameResult answers={answers} points={gamePoints} />;

  return (
    <>
      <CircleTimer pause={timer.isPause} onTimeOver={timer.onTimeOver} />
      <div className={styles.content}>
        <SprintGameHeader gamePoints={gamePoints} audio={''} />
        <SprintGameDotsOfAnswers
          numberOfContinuousCorrectAnswers={numberOfContinuousAnswers.correct}
          numberOfContinuousWrongAnswers={numberOfContinuousAnswers.wrong}
        />
        <div className={styles.words}>
          {' '}
          {/* вынести в компонент  */}
          {wordsLoading && <div>Loading...</div>}
          {sprintStep && (
            <SprintGameWords
              word={sprintStep.word}
              mockWordTranslate={sprintStep.mockWordTranslate}
            />
          )}
        </div>
        <SprintGameButtons
          onFalseClick={handlers.onFalseClick}
          onTrueClick={handlers.onTrueClick}
          disabled={wordsLoading}
        />
      </div>
      <SprintGamePoints gamePoints={gamePoints} />
    </>
  );
};

export default SprintGame;
