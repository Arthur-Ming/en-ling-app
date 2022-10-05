import { DEFAULT_GROUP } from '../../../redux/constants';

interface OwnProps {
  level?: number;
}

type Props = OwnProps;

const SprintGame = ({ level = DEFAULT_GROUP }: Props) => {
  return (
    <div>
      <h2 style={{ marginTop: '100px' }}>SprintGame{level}</h2>
      <button>Start</button>
      <button>Stop</button>
      <button>Reset</button>
    </div>
  );
};

export default SprintGame;
