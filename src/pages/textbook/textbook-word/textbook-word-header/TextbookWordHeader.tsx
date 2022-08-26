import classNames from 'classnames';
import { connect } from 'react-redux';
import { currentAudioPathSelector } from '../../../../redux/selectors';
import { RootState } from '../../../../redux/store';
import styles from '../textbook-word.module.scss';

interface StateProps {
  isCurrentAudioPath: boolean;
}

interface OwnProps {
  wordText: string;
  transcription: string;
  wordTranslate: string;
  audio: string;
}

type TProps = OwnProps & StateProps;

const TextbookWordHeader = ({
  wordText,
  transcription,
  wordTranslate,
  isCurrentAudioPath,
}: TProps) => {
  return (
    <div>
      <h3
        className={classNames(styles.header_title, {
          [styles.active]: isCurrentAudioPath,
        })}
      >{`${wordText} - ${transcription} - ${wordTranslate}`}</h3>
    </div>
  );
};

const mapStateToProps = (state: RootState, { audio }: OwnProps) => ({
  isCurrentAudioPath: currentAudioPathSelector(state) === audio,
});

export default connect(mapStateToProps)(TextbookWordHeader);
