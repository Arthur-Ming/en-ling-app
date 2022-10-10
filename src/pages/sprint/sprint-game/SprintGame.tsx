import { useEffect, useState } from 'react';
import Loader from '../../../components/loader';
import useSprintGame from '../../../hooks/useSprintGame';
import { ITextbookWord } from '../../../interfaces';
import { DEFAULT_GROUP, GROUP_SHIFT, PAGE_SHIFT } from '../../../redux/constants';
import api from '../../../utils/api';
import { apiRoutes } from '../../../utils/apiRoutes';
import CircleTimer from '../circle-timer';
import SprintGameBody from './sprint-game-body';
import SprintGameFooter from './sprint-game-footer';
import SprintGameHeader from './sprint-game-header';
import styles from './sprint-game.module.scss';

interface OwnProps {
  level?: number;
}

type Props = OwnProps;

const SprintGame = ({ level = DEFAULT_GROUP }: Props) => {
  const { wordsLoading, sprintStep, onFalseClick, onTrueClick } = useSprintGame(level);

  return (
    <main>
      <div className={styles.box}>
        <CircleTimer
          start={false}
          onTimeOver={() => {
            console.log('time over');
          }}
        />
        <div className={styles.content}>
          {wordsLoading && <Loader />}
          {!wordsLoading && sprintStep && (
            <>
              <SprintGameHeader score={20} audio={''} />
              <SprintGameBody word={sprintStep.word} wordTranslate={sprintStep.translate} />
              <SprintGameFooter onFalseClick={onFalseClick} onTrueClick={onTrueClick} />
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default SprintGame;
