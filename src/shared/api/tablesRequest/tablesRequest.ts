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
  id: number;
};

type postTables = {
  tableNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
  id?: number;
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
  endpoints: build => ({
    getTables: build.query<getTables[], void>({
      query: () => '/tables'
    }),
    postTables: build.mutation<postTables, Partial<postTables>>({
      query: data => ({
        url: '/tables',
        method: 'POST',
        body: {
          tables: data
        }
      })
    })
  })
});

export const { useGetTablesQuery, usePostTablesMutation } = tablesRequest;
