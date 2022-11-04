import { selector, Selector } from '.';
import { IUserState } from '../reducer/user';
import { RootState } from '../store';

const userSelector: Selector<IUserState> = (state, field) => selector(state, 'user')[field];

export const userNameSelector = (state: RootState) => userSelector(state, 'name');
export const userLoadingSelector = (state: RootState) => userSelector(state, 'loading');
export const userErrorSelector = (state: RootState) => userSelector(state, 'error');
export const userIsAuthSelector = (state: RootState) => userSelector(state, 'isAuth');
