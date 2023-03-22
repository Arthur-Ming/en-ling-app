import { SprintGameAnswer } from '../../../../../interfaces';
import styles from './../sprint-game-result.module.scss';
import { currentAudioWordIdSelector } from '../../../../../redux/selectors/audio';
import { wordAudioStop, wordAudioPlay } from '../../../../../redux/actions/audio';
import { AppDispatch, RootState } from '../../../../../redux/store';
import { connect } from 'react-redux';
import AudioButton from '../../../../../components/audio-button';
import classNames from 'classnames';

type OwnProps = {
  answer: SprintGameAnswer;
};

interface StateProps {
  isCurrentAudio: boolean;
}

interface DispatchProps {
  onAudioStart: () => void;
  onAudioStop: () => void;
}

type Props = OwnProps & DispatchProps & StateProps;

const SprintGameResultItem = ({ answer, isCurrentAudio, onAudioStop, onAudioStart }: Props) => {
  return (
    <div
      className={classNames(styles.answer, {
        [styles.answer_active]: isCurrentAudio,
      })}
      onClick={isCurrentAudio ? onAudioStop : onAudioStart}
    >
      <AudioButton
        isCurrentAudio={isCurrentAudio}
        audioClass={styles.icon}
        muteClass={styles.icon}
        buttonClass={styles.button}
      />
      <div className={styles.word}>
        <p>{answer.word}</p>
        <span>-</span>
        <p>{answer.wordTranslate}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState, { answer }: OwnProps) => ({
  isCurrentAudio: currentAudioWordIdSelector(state) === answer.id,
});

const mapDispatchToProps = (dispatch: AppDispatch, { answer }: OwnProps) => ({
  onAudioStart: () => dispatch(wordAudioPlay(answer.id, answer.audio)),
  onAudioStop: () => dispatch(wordAudioStop()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SprintGameResultItem);
