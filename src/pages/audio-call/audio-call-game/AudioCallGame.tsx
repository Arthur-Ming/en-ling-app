import { DEFAULT_GROUP } from '../../../redux/constants';

interface OwnProps {
  level?: number;
}

type Props = OwnProps;

const AudioCallGame = ({ level = DEFAULT_GROUP }: Props) => (
  <div>
    <h2 style={{ marginTop: '100px' }}> AudioCallGame {level}</h2>
  </div>
);

export default AudioCallGame;
