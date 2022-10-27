import useSprintGame from '../../../hooks/useSprintGame';
import { DEFAULT_GROUP } from '../../../constants';
import CircleTimer from '../circle-timer';
import SprintGameWords from './sprint-game-words';
import SprintGameButtons from './sprint-game-footer';
import SprintGameHeader from './sprint-game-header';
import styles from './sprint-game.module.scss';
import SprintGamePoints from './sprint-game-points';
import SprintGameDotsOfAnswers from './sprint-game-dots';
import SprintGameResult from './sprint-game-result';
import useSprintGameTimer from '../../../hooks/useSprintGame/useSprintGameTimer';

interface OwnProps {
  level?: number;
}

type Props = OwnProps;

const SprintGame = ({ level = DEFAULT_GROUP }: Props) => {
  const {
    sprintStep,
    requestState,
    handlers,
    pagesOver,
    gamePoints,
    numberOfContinuousAnswers,
    answers,
  } = useSprintGame(level);
  const timer = useSprintGameTimer(requestState.loaded);

  if (pagesOver || timer.isTimeOver)
    return <SprintGameResult answers={answers} points={gamePoints} />;

  return (
    <main className={styles.main}>
      <div className={styles.box}>
        <CircleTimer pause={timer.isPause} onTimeOver={timer.onTimeOver} />
        <div className={styles.content}>
          <SprintGameHeader gamePoints={gamePoints} audio={''} />
          <SprintGameDotsOfAnswers numberOfContinuousAnswers={numberOfContinuousAnswers} />
          <div className={styles.words}>
            {requestState.loading && <div>Loading...</div>}
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
            disabled={requestState.loading}
          />
        </div>
        <SprintGamePoints gamePoints={gamePoints} />
      </div>
    </main>
  );
};

export default SprintGame;
