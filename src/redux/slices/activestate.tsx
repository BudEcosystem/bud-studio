/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const generateInitialState = (): any => {
  const initialState: any = {};
  return initialState;
};
export const activestateSlice = createSlice({
  name: 'activestate',
  initialState: generateInitialState,
  reducers: {},
});
export const {} = activestateSlice.actions;
export default activestateSlice.reducer;
