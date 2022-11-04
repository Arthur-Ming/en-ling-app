import React from 'react';
import styles from '../../sprint.module.scss';

interface Props {
  word: string;
  mockWordTranslate: string;
}

const SprintGameWords = ({ word, mockWordTranslate }: Props) => {
  return (
    <>
      <p className={styles.word}>{word}</p>
      <p className={styles.translate}>{mockWordTranslate}</p>
    </>
  );
};

export default React.memo(SprintGameWords);
