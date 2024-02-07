import { createSlice } from '@reduxjs/toolkit';

type TInitialState = {
  loggedIn: boolean;
};

const initialState: TInitialState = {
  loggedIn: false
};

const initLoggedInSlice = createSlice({
  name: 'initLoggedIn',
  initialState: initialState,
  reducers: {
    setTrue: state => {
      state.loggedIn = true;
    },
    setFalse: state => {
      state.loggedIn = false;
    }
  }
});

export default initLoggedInSlice;
export const { setTrue, setFalse } = initLoggedInSlice.actions;
