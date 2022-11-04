import { ISignInAction, ISuccessfulLogin, ISuccessfulUserById, SignInType } from '../../interfaces';
import { FAILURE, REQUEST, SIGN_IN, SUCCESS } from '../action-types';
import { Dispatch } from '@reduxjs/toolkit';
import fetchJson from '../../utils/fetch-json';
import { apiRoutes } from '../../utils/apiRoutes';
import Cookies from 'js-cookie';
import { TOKEN, USER_ID } from '../../constants';

const inHalfADay = 0.5;

export const signIn = (requestBody: SignInType) => async (dispatch: Dispatch<ISignInAction>) => {
  dispatch({ type: SIGN_IN + REQUEST });

  try {
    const data = await fetchJson(apiRoutes.signin(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(requestBody),
    });
    const { name: userName, token, userId } = <ISuccessfulLogin>data;
    if (token && userId) {
      Cookies.set(TOKEN, token, {
        expires: inHalfADay,
      });
      Cookies.set(USER_ID, userId, {
        expires: inHalfADay,
      });
    }
    dispatch({ type: SIGN_IN + SUCCESS, userName });
  } catch (err: unknown) {
    if (err instanceof Error) {
      dispatch({ type: SIGN_IN + FAILURE, error: err.message });
    }
  }
};

export const getUserById = () => async (dispatch: Dispatch<ISignInAction>) => {
  const token = Cookies.get(TOKEN);
  const userId = Cookies.get(USER_ID);

  if (token && userId) {
    dispatch({ type: SIGN_IN + REQUEST });
    try {
      const data = await fetchJson(apiRoutes.userById(userId), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const { name: userName } = <ISuccessfulUserById>data;

      dispatch({ type: SIGN_IN + SUCCESS, userName });
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch({ type: SIGN_IN + FAILURE, error: err.message });
      }
    }
  }
};
