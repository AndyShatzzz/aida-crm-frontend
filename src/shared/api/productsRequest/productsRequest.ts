import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BASE_URL } from '../BaseUrlApi/BaseUrlApi';

type TGetProducts = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  owner: string;
};

type TPostProducts = {
  name: string;
  quantity: number;
  price: number;
  image: string;
  owner: string;
  _id: string;
};

type TGetCheques = {
  _id?: string;
  tableNumber: number;
  status: boolean;
  productsList: any;
  owner: string;
  prevState: any;
  updatedState?: any;
  createdAt?: Date; // может быть косяк!!!
};

type TPostCheque = {
  tableNumber: number;
  status: boolean;
  productsList: any;
  owner: string;
  prevState: any;
};

type TPatchCheque = {
  _id: string;
  productsList: {
    cheque: any;
    totalCost: number | null;
  };
  prevState: any;
};

type TPatchChequeStatus = {
  _id: string;
  status: boolean;
  productsList: any;
};

export const productsRequest = createApi({
  reducerPath: 'productsRequest',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: headers => {
      headers.set('authorization', `Bearer ${localStorage.getItem('JWT')}`);
      headers.set('Content-Type', 'application/json');
    }
  }),
  endpoints: build => ({
    getProducts: build.query<TGetProducts[], void>({
      query: () => '/products'
    }),
    postProduct: build.mutation<TPostProducts, Partial<TPostProducts>>({
      query: data => ({
        url: '/products',
        method: 'POST',
        body: {
          name: data.name,
          quantity: data.quantity,
          price: data.price,
          image: data.image
        }
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data: newProduct } = await queryFulfilled;
          dispatch(
            productsRequest.util.updateQueryData('getProducts', undefined, draft => {
              draft?.push(newProduct);
            })
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      }
    }),
    deleteProduct: build.mutation({
      query: ({ _id }) => ({
        url: `/products/${_id}`,
        method: 'DELETE'
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(
            productsRequest.util.updateQueryData('getProducts', undefined, draft => {
              return draft?.filter(item => item._id !== args._id);
            })
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      }
    }),
    patchProduct: build.mutation<TPostProducts, Partial<TPostProducts>>({
      query: ({ _id, ...data }) => ({
        url: `/products/${_id}`,
        method: 'PATCH',
        body: {
          name: data.name,
          quantity: data.quantity,
          price: data.price,
          image: data.image
        }
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedProduct } = await queryFulfilled;
          dispatch(
            productsRequest.util.updateQueryData('getProducts', undefined, draft => {
              const product: any = draft?.find(item => item?._id === args?._id);
              product.name = updatedProduct.name;
              product.quantity = updatedProduct.quantity;
              product.price = updatedProduct.price;
              product.image = updatedProduct.image;
            })
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      }
    }),
    getCheques: build.query<TGetCheques[], void>({
      query: () => '/cheques'
    }),

    postCheque: build.mutation<TPostCheque, Partial<TPostCheque>>({
      query: data => ({
        url: '/cheques',
        method: 'POST',
        body: {
          tableNumber: data.tableNumber,
          status: data.status,
          productsList: data.productsList,
          owner: data.owner,
          prevState: data.prevState
        }
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data: newCheque } = await queryFulfilled;
          dispatch(
            productsRequest.util.updateQueryData('getCheques', undefined, draft => {
              draft?.push(newCheque);
            })
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      }
    }),
    patchCheque: build.mutation<TPatchCheque, Partial<TPatchCheque>>({
      query: ({ _id, ...data }) => ({
        url: `/cheques/${_id}`,
        method: 'PATCH',
        body: {
          productsList: data.productsList,
          prevState: data.prevState
        }
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data: changedCheque } = await queryFulfilled;
          dispatch(
            productsRequest.util.updateQueryData('getCheques', undefined, draft => {
              const cheque: any = draft?.find(item => item?._id === args?._id);
              cheque.productsList = changedCheque.productsList;
              cheque.prevState = changedCheque.prevState;
            })
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      }
    }),
    patchChequeStatus: build.mutation<TPatchChequeStatus, Partial<TPatchChequeStatus>>({
      query: ({ _id, ...data }) => ({
        url: `/cheques/status/${_id}`,
        method: 'PATCH',
        body: {
          status: data.status,
          productsList: data.productsList
        }
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data: changedCheque } = await queryFulfilled;
          dispatch(
            productsRequest.util.updateQueryData('getCheques', undefined, draft => {
              const cheque: any = draft?.find(item => item?._id === args?._id);
              cheque.status = changedCheque.status;
              cheque.productsList = changedCheque.productsList;
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

export const {
  useGetProductsQuery,
  usePostProductMutation,
  useDeleteProductMutation,
  usePatchProductMutation,
  useGetChequesQuery,
  usePostChequeMutation,
  usePatchChequeMutation,
  usePatchChequeStatusMutation
} = productsRequest;
