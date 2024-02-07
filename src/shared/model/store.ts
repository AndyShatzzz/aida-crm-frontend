import { configureStore } from '@reduxjs/toolkit';
import { usersRequest } from '../api/usersRequest/UsersRequest';
import { productsRequest } from '../api/productsRequest/productsRequest';
import initLoggedInSlice from '../../features/checkToken/config/initLoggedInSlice';
import productReducer from '../productSlice/productSlice';

const store = configureStore({
  reducer: {
    initLoggedInSlice: initLoggedInSlice.reducer,
    productReducer: productReducer,
    [productsRequest.reducerPath]: productsRequest.reducer,
    [usersRequest.reducerPath]: usersRequest.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([productsRequest.middleware, usersRequest.middleware])
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
