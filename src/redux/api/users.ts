import Cookies from 'js-cookie';
import { IUser, ILoginBody } from '../../interfaces';
import { login } from '../reducer/session';
import { api } from './';

class AppError extends Error {
  status: number | undefined;
  constructor(message: string) {
    super(message);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string) {
    super(message);
    this.status = 401;
  }
}

const tokenExpire = 0.5;

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<IUser, ILoginBody>({
      query: (body) => {
        return {
          url: `/users/login`,
          method: 'POST',
          body,
        };
      },
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          const { token, name, id, email } = data;
          Cookies.set('token', token, {
            expires: tokenExpire,
          });
          Cookies.set('userId', id, {
            expires: tokenExpire,
          });
          dispatch(login({ name, email }));
        } catch (error) {}
      },
    }),
    registerUser: builder.mutation({
      query: (body) => {
        return {
          url: `/users/register`,
          method: 'POST',
          body,
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {}
      },
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterUserMutation, useLoginUserMutation } = usersApi;
