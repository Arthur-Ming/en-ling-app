import { useState } from 'react';
import { DEFAULT_GROUP } from '../../../redux/constants';
import CircleTimer from '../circle-timer';

interface OwnProps {
  level?: number;
}

type Props = OwnProps;

const SprintGame = ({ level = DEFAULT_GROUP }: Props) => {
  const [timerStart, setTimerStart] = useState(false);
  const onTimeOver = () => console.log('timeOver');
  const onTimerStart = () => setTimerStart(true);
  const onTimerStop = () => {
    setTimerStart(false);
  };
  return (
    <div>
      <h2 style={{ marginTop: '300px' }}>SprintGame{level}</h2>
      <CircleTimer start={timerStart} onTimeOver={onTimeOver} />
      <button onClick={onTimerStart}>Start</button>
      <button onClick={onTimerStop}>Stop</button>
      <button>Reset</button>
    </div>
  );
};

export default SprintGame;
