import { FAILURE, LOAD_WORDS, REQUEST, SUCCESS, TEXTBOOK_PAGE_CHANGE } from '../constants';
import { IAction, ITextbookCardsAction } from '../../interfaces';
import { apiRoutes } from '../../utils/apiRoutes';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { textbookLoadedSelector, textbookLoadingSelector } from '../selectors';
import api from '../../utils/api';

export const getWords =
  (page: number, group: number) =>
  async (dispatch: Dispatch<ITextbookCardsAction>, getState: () => RootState) => {
    const state = getState();

    const loading = textbookLoadingSelector(state);
    const loaded = textbookLoadedSelector(state);

    if (loading || loaded) return;

    dispatch({ type: LOAD_WORDS + REQUEST });

    try {
      const data = await api.get(apiRoutes.words(page, group));
      dispatch({ type: LOAD_WORDS + SUCCESS, data, page, group });
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch({ type: LOAD_WORDS + FAILURE, error: err.message });
      }
    }
  };

export const pageChange = (): IAction => ({
  type: TEXTBOOK_PAGE_CHANGE,
});
