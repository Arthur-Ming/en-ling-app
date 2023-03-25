import { connect } from 'react-redux';
import AudioButton from '../../../../../components/audio-button';
import { wordAudioPlay, wordAudioStop } from '../../../../../redux/actions/audio';
import { currentAudioWordIdSelector } from '../../../../../redux/selectors/audio';
import { AppDispatch, RootState } from '../../../../../redux/store';

interface OwnProps {
  wordId: string;
  audio: string;
}

interface StateProps {
  isCurrentAudio: boolean;
}

interface DispatchProps {
  onAudioStart: () => void;
  onAudioStop: () => void;
}

type Props = OwnProps & DispatchProps & StateProps;

const WordTicketAudio = ({ isCurrentAudio, onAudioStart, onAudioStop }: Props) => (
  <AudioButton
    isCurrentAudio={isCurrentAudio}
    onAudioStart={onAudioStart}
    onAudioStop={onAudioStop}
  />
);

const mapStateToProps = (state: RootState, { wordId }: OwnProps) => ({
  isCurrentAudio: currentAudioWordIdSelector(state) === wordId,
});

const mapDispatchToProps = (dispatch: AppDispatch, { wordId, audio }: OwnProps) => ({
  onAudioStart: () => dispatch(wordAudioPlay(wordId, audio)),
  onAudioStop: () => dispatch(wordAudioStop()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WordTicketAudio);
