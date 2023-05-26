/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const generateInitialState = (): any => {
  const initialState: any = {
    currentSelectedUI: '',
    selectedOption: 'Editor'
  };
  return initialState;
};
export const activestateSlice = createSlice({
  name: 'activestate',
  initialState: generateInitialState,
  reducers: {
    setCurrentSelectedUI: (state, action: PayloadAction<any>) => {
      state.currentSelectedUI = action.payload;
    },
    setSelectedOption: (state, action: PayloadAction<any>) => {
      state.selectedOption = action.payload;
    },
  },
});
export const { setCurrentSelectedUI, setSelectedOption } = activestateSlice.actions;
export default activestateSlice.reducer;
