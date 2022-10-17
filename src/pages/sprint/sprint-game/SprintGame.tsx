import Loader from '../../../components/loader';
import useSprintGame from '../../../hooks/useSprintGame';
import { DEFAULT_GROUP } from '../../../constants';
import CircleTimer from '../circle-timer';
import SprintGameBody from './sprint-game-body';
import SprintGameFooter from './sprint-game-footer';
import SprintGameHeader from './sprint-game-header';
import styles from './sprint-game.module.scss';
import SprintGamePoints from './sprint-game-points';

interface OwnProps {
  level?: number;
}

type Props = OwnProps;

const SprintGame = ({ level = DEFAULT_GROUP }: Props) => {
  /* const { wordsLoading, sprintStep, onFalseClick, onTrueClick, gamePoints } = useSprintGame(level); */
  const { sprintStep, requestState, handlers, pagesOver, gamePoints, answers } =
    useSprintGame(level);

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
          {requestState.loading && <Loader />}
          {!requestState.loading && sprintStep && (
            <>
              {/*  <SprintGameHeader totalGamePoints={gamePoints.total} audio={''} /> */}
              <SprintGameBody word={sprintStep.word} wordTranslate={sprintStep.mockWordTranslate} />
              <SprintGameFooter
                onFalseClick={handlers.onFalseClick}
                onTrueClick={handlers.onTrueClick}
              />
            </>
          )}
        </div>
        {/*    <SprintGamePoints gamePoints={gamePoints.current} total={gamePoints.total} /> */}
      </div>
    </main>
  );
};

export default SprintGame;
