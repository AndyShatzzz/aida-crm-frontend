import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductData } from './type/productData';
import { ProductsState } from './type/productsState';

const initialState: ProductsState = {};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProduct: (state, action: PayloadAction<Record<string, never>>) => {
      return action.payload;
    },
    addProduct: (state, action: PayloadAction<{ productId: string; productData: ProductData }>) => {
      const { productId, productData } = action.payload;
      if (state[productId]) {
        state[productId].quantity = productData.quantity;
      } else {
        state[productId] = { ...productData };
      }
    },
    subtractPayload: (state, action: PayloadAction<{ productId: string; payload: number }>) => {
      const { productId, payload } = action.payload;
      if (state[productId]) {
        state[productId].quantity -= payload;
      }
    }
  }
});

export const { addProduct, subtractPayload, resetProduct } = productSlice.actions;
export default productSlice.reducer;
