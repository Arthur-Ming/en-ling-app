import classNames from 'classnames';
import { useState } from 'react';
import useTextbookPageParams from '../../hooks/useTextbookPageParams';
import { GROUP_COUNT } from '../../constants';
import styles from './index.module.scss';
import PageRange from '../../components/PageRange';
import GroupPicker from '../../components/GroupPicker/GroupPicker';
import { ReactComponent as LabelIcon } from './label.svg';
import SprintGame from './sprint-game/SprintGame';
import { ISprintResult } from '../../interfaces';
import SprintResultModal from './SprintResultModal/SprintResultModal';
import SprintEntry from './SprintEntry/SprintEntry';

const groups = Array.from(Array(GROUP_COUNT), (_, index) => index + 1);

type Props = {
  results?: ISprintResult[];
};

const Sprint = ({ results }: Props) => {
  const { group, page } = useTextbookPageParams();
  const [selectedGroup, setSelectedGroup] = useState(group);
  const [pageRange, setPageRange] = useState([1, page]);
  const [isGame, setIsGame] = useState(false);
  const [isShowResult, setShowResult] = useState(Boolean(results));

  if (isGame) return <SprintGame group={selectedGroup} pageRange={pageRange} />;

  const onPlay = () => {
    setIsGame(true);
  };

  return (
    <>
      <SprintEntry
        onPlay={onPlay}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        pageRange={pageRange}
        setPageRange={setPageRange}
      />
      {results && isShowResult && (
        <SprintResultModal results={results} onClose={() => setShowResult(false)} onPlay={onPlay} />
      )}
    </>
  );
};

export default Sprint;
