import Loader from '../../../components/loader';
import useSprintGame from '../../../hooks/useSprintGame';
import { DEFAULT_GROUP } from '../../../constants';
import CircleTimer from '../circle-timer';
import SprintGameWords from './sprint-game-words';
import SprintGameButtons from './sprint-game-footer';
import SprintGameHeader from './sprint-game-header';
import styles from './sprint-game.module.scss';
import SprintGamePoints from './sprint-game-points';
import SprintGameInd from './sprint-game-ind';

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

  if (pagesOver) return <div style={{ marginTop: '100px' }}>Игра окончена</div>;

  return (
    <main className={styles.main}>
      <div className={styles.box}>
        <CircleTimer
          start={false}
          onTimeOver={() => {
            console.log('time over');
          }}
        />
        <div className={styles.content}>
          <SprintGameHeader gamePoints={gamePoints} audio={''} />
          <SprintGameInd numberOfContinuousAnswers={numberOfContinuousAnswers} />
          <div className={styles.words}>
            {!sprintStep && <div>Loading...</div>}
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
            disabled={!Boolean(sprintStep)}
          />
        </div>
        <SprintGamePoints gamePoints={gamePoints} />
      </div>
    </main>
  );
};

export default SprintGame;
