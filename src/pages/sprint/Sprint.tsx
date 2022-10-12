import { Navigate, useParams } from 'react-router';
import { RANGE_GROUP } from '../../constants';
import SprintGame from './sprint-game';

const Sprint = () => {
  const { group = null } = useParams();

  const [min, max] = RANGE_GROUP;

  if (group === null) return <Navigate to={`${min}`} />;

  const level = Number(group);

  if (isNaN(level) || level > max || level < min) return <Navigate to="/games" />;

  return <SprintGame level={level} />;
};

export default Sprint;
