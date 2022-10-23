import Loader from '../../../components/loader';
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

const answers = [
  {
    id: '5e9f5ee35eb9e72bc21af6b5',
    word: 'puzzle',
    wordTranslate: 'головоломка',
    audio: 'files/27_0534.mp3',
    isCorrectAnswer: false,
  },
  {
    id: '5e9f5ee35eb9e72bc21af6ae',
    word: 'examine',
    wordTranslate: 'исследовать',
    audio: 'files/27_0527.mp3',
    isCorrectAnswer: false,
  },
  {
    id: '5e9f5ee35eb9e72bc21af6b8',
    word: 'specific',
    wordTranslate: 'конкретный',
    audio: 'files/27_0537.mp3',
    isCorrectAnswer: true,
  },
  {
    id: '5e9f5ee35eb9e72bc21af6b4',
    word: 'journey',
    wordTranslate: 'поездка',
    audio: 'files/27_0533.mp3',
    isCorrectAnswer: false,
  },
  {
    id: '5e9f5ee35eb9e72bc21af6b1',
    word: 'gift',
    wordTranslate: 'подарок',
    audio: 'files/27_0530.mp3',
    isCorrectAnswer: true,
  },
  {
    id: '5e9f5ee35eb9e72bc21af6b2',
    word: 'hunger',
    wordTranslate: 'голод',
    audio: 'files/27_0531.mp3',
    isCorrectAnswer: false,
  },
  {
    id: '5e9f5ee35eb9e72bc21af6b7',
    word: 'rather',
    wordTranslate: 'скорее',
    audio: 'files/27_0536.mp3',
    isCorrectAnswer: true,
  },
  {
    id: '5e9f5ee35eb9e72bc21af6ab',
    word: 'deal',
    wordTranslate: 'сделка',
    audio: 'files/27_0524.mp3',
    isCorrectAnswer: true,
  },
  {
    id: '5e9f5ee35eb9e72bc21af6bb',
    word: 'trip',
    wordTranslate: 'поездка',
    audio: 'files/27_0540.mp3',
    isCorrectAnswer: false,
  },
  {
    id: '5e9f5ee35eb9e72bc21af6af',
    word: 'false',
    wordTranslate: 'ложный',
    audio: 'files/27_0528.mp3',
    isCorrectAnswer: true,
  },
  {
    id: '5e9f5ee35eb9e72bc21af6ad',
    word: 'effective',
    wordTranslate: 'эффективный',
    audio: 'files/27_0526.mp3',
    isCorrectAnswer: false,
  },
  {
    id: '5e9f5ee35eb9e72bc21af6ac',
    word: 'desert',
    wordTranslate: 'пустыня',
    audio: 'files/27_0525.mp3',
    isCorrectAnswer: false,
  },
  {
    id: '5e9f5ee35eb9e72bc21af6b9',
    word: 'spider',
    wordTranslate: 'паук',
    audio: 'files/27_0538.mp3',
    isCorrectAnswer: true,
  },
  {
    id: '5e9f5ee35eb9e72bc21af6b6',
    word: 'quite',
    wordTranslate: 'довольно',
    audio: 'files/27_0535.mp3',
    isCorrectAnswer: false,
  },
  {
    id: '5e9f5ee35eb9e72bc21af6a9',
    word: 'bite',
    wordTranslate: 'укусить',
    audio: 'files/27_0522.mp3',
    isCorrectAnswer: false,
  },
  {
    id: '5e9f5ee35eb9e72bc21af6aa',
    word: 'coast',
    wordTranslate: 'побережье',
    audio: 'files/27_0523.mp3',
    isCorrectAnswer: false,
  },
];

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
    /*   answers, */
  } = useSprintGame(level);

  if (pagesOver) return <div style={{ marginTop: '100px' }}>Игра окончена</div>;

  return <SprintGameResult answers={answers} />;

  /* return (
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
          <SprintGameDotsOfAnswers numberOfContinuousAnswers={numberOfContinuousAnswers} />
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
  ); */
};

export default SprintGame;
