import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BASE_URL } from '../BaseUrlApi/BaseUrlApi';
import { TUsers } from './types/TUsers';

export const usersRequest = createApi({
  reducerPath: 'usersRequest',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: headers => {
      headers.set('authorization', `Bearer ${localStorage.getItem('JWT')}`);
      headers.set('Content-Type', 'application/json');
    }
  }),
  endpoints: build => ({
    getUsers: build.query<TUsers[], void>({
      query: () => '/users'
    }),
    getUserInfo: build.query<TUsers, void>({
      query: () => '/users/me'
    }),
    patchUsers: build.mutation<TUsers, Partial<TUsers>>({
      query: ({ _id, ...body }) => ({
        url: `users/${_id}`,
        method: 'PATCH',
        body: {
          avatar: body.avatar,
          name: body.name,
          role: body.role
        }
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedUser } = await queryFulfilled;
          dispatch(
            usersRequest.util.updateQueryData('getUsers', undefined, draft => {
              const project: any = draft?.find(item => item?._id === args?._id);
              project.avatar = updatedUser.avatar;
              project.name = updatedUser.name;
              project.role = updatedUser.role;
            })
          );
          dispatch(
            usersRequest.util.updateQueryData('getUserInfo', undefined, draft => {
              const project = draft;
              if (project._id === updatedUser._id) {
                project.avatar = updatedUser.avatar;
                project.name = updatedUser.name;
                project.role = updatedUser.role;
              }
            })
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      }
    })
  })
});

export const { useGetUsersQuery, useGetUserInfoQuery, usePatchUsersMutation } = usersRequest;
