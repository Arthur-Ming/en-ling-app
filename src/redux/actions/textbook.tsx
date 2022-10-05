import { FAILURE, GROUP_SHIFT, LOAD_WORDS, PAGE_SHIFT, REQUEST, SUCCESS } from '../constants';
import { ITextbookCardsAction } from '../../interfaces';
import { apiRoutes } from '../../utils/apiRoutes';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';

import api from '../../utils/api';
import {
  textbookLoadedSelector,
  textbookGroupSelector,
  textbookPageSelector,
} from '../selectors/textbook';

export const getWords =
  (page: number, group: number) =>
  async (dispatch: Dispatch<ITextbookCardsAction>, getState: () => RootState) => {
    const state = getState();

    const currentPage = textbookPageSelector(state);
    const currentGroup = textbookGroupSelector(state);

    const loaded = textbookLoadedSelector(state);

    if (loaded && currentPage === page && currentGroup === group) return;

    dispatch({ type: LOAD_WORDS + REQUEST });

    try {
      const data = await api.get(apiRoutes.words(page - PAGE_SHIFT, group - GROUP_SHIFT));
      dispatch({ type: LOAD_WORDS + SUCCESS, data, page, group });
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch({ type: LOAD_WORDS + FAILURE, error: err.message });
      }
    }
  };
