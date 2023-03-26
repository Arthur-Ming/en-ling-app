import styles from './index.module.scss';
import { ReactComponent as LabelIcon } from './label.svg';
import WordTicketAudio from './WordTicketAudio';
import { useNavigate } from 'react-router';
import { IWord } from '../../../../interfaces';
import { apiRoutes } from '../../../../utils/apiRoutes';
import WordChosen from '../../WordChosen';
import classNames from 'classnames';

type Props = {
  word: IWord;
};

const WordTicket = ({ word }: Props) => {
  const { id: wordId, word: wordText, image, transcription, wordTranslate, audio, group } = word;
  const navigate = useNavigate();

  return (
    <div className={styles.box} onClick={() => navigate(wordId)}>
      <div className={styles.info}>
        <div className={styles.image}>
          <img src={apiRoutes.files(image)} alt={wordText} />
        </div>
        <h3 className={styles.title}>{`${wordText} - ${transcription} - ${wordTranslate}`}</h3>
      </div>

      <div className={styles.buttons}>
        <WordChosen word={word} />
        <WordTicketAudio wordId={wordId} audio={audio} />
      </div>
      <LabelIcon className={classNames(styles.label, styles[`level-${group + 1}`])} />
    </div>
  );
};

export default WordTicket;
