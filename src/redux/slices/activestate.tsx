/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const generateInitialState = (): any => {
  const initialState: any = {
    currentSelectedUI: '',
    selectedOption: 'Editor',
    nodeIDs: {
      uuid: null,
      workSpaceUUID: null,
    },
    navigationPathArray: [{}],
  };
  return initialState;
};
export const activestateSlice = createSlice({
  name: 'activestate',
  initialState: generateInitialState(),
  reducers: {
    setCurrentSelectedUI: (state, action: PayloadAction<any>) => {
      state.currentSelectedUI = action.payload;
    },
    setSelectedOption: (state, action: PayloadAction<any>) => {
      state.selectedOption = action.payload;
    },
    setNodeIDs: (state, action: PayloadAction<any>) => {
      state.nodeIDs = action.payload;
    },
    setNavigationPath: (state, action: PayloadAction<any>) => {
      if (action.payload === null) {
        state.navigationPathArray = [];
      } else {
        state.navigationPathArray?.unshift(action.payload?.name);
      }
    },
  },
});
export const {
  setCurrentSelectedUI,
  setSelectedOption,
  setNodeIDs,
  setNavigationPath,
} = activestateSlice.actions;
export default activestateSlice.reducer;
