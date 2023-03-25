import classNames from 'classnames';
import { AiFillFire } from 'react-icons/ai';
import { connect, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IWord } from '../../../interfaces';
import { useAddUserWordMutation, useRemoveUserWordMutation } from '../../../redux/api/userWords';
import { userWordsByIdSelector } from '../../../redux/selectors/userWords';
import { AppDispatch, RootState } from '../../../redux/store';
import styles from './index.module.scss';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type StateProps = {
  isChosenAlt: boolean;
};

type OwnProps = {
  word: IWord;
};

type Props = OwnProps & StateProps;

const WordChosen = ({ word, isChosenAlt }: Props) => {
  const [addUserWord] = useAddUserWordMutation();
  const [removeUserWord] = useRemoveUserWordMutation();
  console.log(isChosenAlt);
  return (
    <AiFillFire
      className={classNames(styles.icon, {
        [styles.isActive]: isChosenAlt,
      })}
      onClick={(e) => {
        e.stopPropagation();
        if (isChosenAlt) {
          removeUserWord(word);
        } else {
          addUserWord(word);
        }
      }}
    />
  );
};

const mapStateToProps = (state: RootState, { word }: OwnProps) => ({
  //isChosen: Boolean(userWordsByIdSelector(state, { wordId: word.id })),
  isChosenAlt: Boolean(userWordsByIdSelector(state, { wordId: word.id })),
});

export default connect(mapStateToProps)(WordChosen);
