import { connect } from 'react-redux';
import { textbookWordFullAudioStart, audioStop } from '../../../../redux/actions/audio';
import { AppDispatch, RootState } from '../../../../redux/store';
import { currentAudioWordIdSelector } from '../../../../redux/selectors/audio';
import AudioButton from '../../../../components/audio-button';

interface OwnProps {
  id: string;
}

interface StateProps {
  isCurrentAudio: boolean;
}

interface DispatchProps {
  onAudioStart: () => void;
  onAudioStop: () => void;
}

type Props = OwnProps & DispatchProps & StateProps;

const TextbookWordAudioButton = (props: Props) => <AudioButton {...props} />;

const mapStateToProps = (state: RootState, { id }: OwnProps) => ({
  isCurrentAudio: currentAudioWordIdSelector(state) === id,
});

const mapDispatchToProps = (dispatch: AppDispatch, { id }: OwnProps) => ({
  onAudioStart: () => dispatch(textbookWordFullAudioStart(id)),
  onAudioStop: () => dispatch(audioStop()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextbookWordAudioButton);
