import { connect } from 'react-redux';
import AudioButton from '../../../../components/audio-button';
import { audioStop, wordAudioStart } from '../../../../redux/actions/audio';
import { currentAudioWordIdSelector } from '../../../../redux/selectors/audio';
import { AppDispatch, RootState } from '../../../../redux/store';

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

const WordTicketAudio = (props: Props) => <AudioButton {...props} />;

const mapStateToProps = (state: RootState, { wordId }: OwnProps) => ({
  isCurrentAudio: currentAudioWordIdSelector(state) === wordId,
});

const mapDispatchToProps = (dispatch: AppDispatch, { wordId, audio }: OwnProps) => ({
  onAudioStart: () => dispatch(wordAudioStart(wordId, audio)),
  onAudioStop: () => dispatch(audioStop()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WordTicketAudio);
