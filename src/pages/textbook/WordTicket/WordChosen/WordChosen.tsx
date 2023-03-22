import classNames from 'classnames';

import { useState } from 'react';
import { AiFillFire } from 'react-icons/ai';
import { connect, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ITextbookWord } from '../../../../interfaces';
import { useAddUserWordMutation, useRemoveUserWordMutation } from '../../../../redux/api/userWords';
import { userWordsByIdSelector } from '../../../../redux/selectors/userWords';
import { AppDispatch, RootState } from '../../../../redux/store';
import styles from './index.module.scss';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type StateProps = {
  isChosen: boolean;
};

type OwnProps = {
  word: ITextbookWord;
};

type Props = OwnProps & StateProps;

const WordChosen = ({ word, isChosen }: Props) => {
  const [addUserWord] = useAddUserWordMutation();
  const [removeUserWord] = useRemoveUserWordMutation();

  return (
    <AiFillFire
      className={classNames(styles.icon, {
        [styles.isActive]: isChosen,
      })}
      onClick={() => {
        if (isChosen) {
          removeUserWord(word);
        } else {
          addUserWord(word);
        }
      }}
    />
  );
};

const mapStateToProps = (state: RootState, { word }: OwnProps) => ({
  isChosen: Boolean(userWordsByIdSelector(state, { wordId: word.id })),
});

export default connect(mapStateToProps)(WordChosen);
