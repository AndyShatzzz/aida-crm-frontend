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
    })
  })
});

export const { useGetProductsQuery, usePostProductMutation, useDeleteProductMutation, usePatchProductMutation } =
  productsRequest;
