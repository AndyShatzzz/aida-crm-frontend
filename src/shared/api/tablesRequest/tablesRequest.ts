import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BASE_URL } from '../BaseUrlApi/BaseUrlApi';

type getTables = {
  tables: {
    tableNumber: number;
    x: number;
    y: number;
    width: number;
    height: number;
    id: number;
  }[];
  _id: number;
};

type postTables = {
  tableNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
  id?: number;
};

type patchTables = {
  tables: {
    tableNumber: number;
    x: number;
    y: number;
    width: number;
    height: number;
    id: number;
  }[];
  _id: number;
};

export const tablesRequest = createApi({
  reducerPath: 'tablesRequest',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: headers => {
      headers.set('authorization', `Bearer ${localStorage.getItem('JWT')}`);
      headers.set('Content-Type', 'application/json');
    }
  }),
  tagTypes: ['Tables'],
  endpoints: build => ({
    getTables: build.query<getTables[], void>({
      query: () => '/tables',
      providesTags: ['Tables']
    }),
    postTables: build.mutation<postTables, Partial<postTables>>({
      query: data => ({
        url: '/tables',
        method: 'POST',
        body: {
          tables: data
        }
      }),
      invalidatesTags: ['Tables']
    }),
    patchTables: build.mutation<patchTables, Partial<patchTables>>({
      query: data => ({
        url: `/tables/${data._id}`,
        method: 'PATCH',
        body: {
          tables: data.tables
        }
      }),
      invalidatesTags: ['Tables']
    })
  })
});

export const { useGetTablesQuery, usePostTablesMutation, usePatchTablesMutation } = tablesRequest;
