import { IUser } from '../../interfaces';
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
    loginUser: builder.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: `/users/login`,
          method: 'POST',
          body,
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          /*     const { token, name, id } = data;
          Cookies.set('token', token, {
            expires: tokenExpire,
          });
          Cookies.set('userId', id, {
            expires: tokenExpire,
          }); */
        } catch (error) {
          console.log('!!!');
          console.error(error);
        }
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
          const { data } = await queryFulfilled;
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterUserMutation, useLoginUserMutation } = usersApi;
