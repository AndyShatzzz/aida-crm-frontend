import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BASE_URL } from '../BaseUrlApi/BaseUrlApi';
import { TGetProducts } from './types/TGetProducts';
import { TPostProducts } from './types/TPostProducts';
import { TGetCheques } from './types/TGetCheques';
import { TPostCheque } from './types/TPostCheque';
import { TPatchChequeStatus } from './types/TPatchChequeStatus';
import { TPatchCheque } from './types/TPatchCheque';

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
              const product: TGetProducts | undefined = draft?.find(item => item?._id === args?._id);
              if (product) {
                product.name = updatedProduct.name;
                product.quantity = updatedProduct.quantity;
                product.price = updatedProduct.price;
                product.image = updatedProduct.image;
              }
            })
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      }
    }),
    patchProductQuantity: build.mutation<TPostProducts, Partial<TPostProducts>>({
      query: ({ _id, ...data }) => ({
        url: `products/quantity/${_id}`,
        method: 'PATCH',
        body: {
          quantity: data.quantity
        }
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedProduct } = await queryFulfilled;
          dispatch(
            productsRequest.util.updateQueryData('getProducts', undefined, draft => {
              const product: any = draft?.find(item => item?._id === args?._id);
              product.quantity = updatedProduct.quantity;
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
  usePatchProductQuantityMutation,
  useGetChequesQuery,
  usePostChequeMutation,
  usePatchChequeMutation,
  usePatchChequeStatusMutation
} = productsRequest;
