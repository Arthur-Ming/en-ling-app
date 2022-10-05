import { Navigate, useParams } from 'react-router';
import { RANGE_GROUP } from '../../redux/constants';
import AudioCallGame from './audio-call-game';

const AudioCall = () => {
  const { group = null } = useParams();

  const [min, max] = RANGE_GROUP;

  if (group === null) return <Navigate to={`${min}`} />;

  const level = Number(group);

  if (isNaN(level) || level > max || level < min) return <Navigate to="/games" />;

  return <AudioCallGame level={level} />;
};

export default AudioCall;
