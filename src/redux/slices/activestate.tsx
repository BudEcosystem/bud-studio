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
    isMoveto: false,
    currentMoveToItem: {},
    copyOrMove: ''
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
    setIsMoveTo: (state, action: PayloadAction<any>) => {
      state.isMoveto = action.payload;
    },
    setCurrentMoveToItem: (state, action: PayloadAction<any>) => {
      // console.log(action.payload, 'asdfg;lk');
      state.currentMoveToItem = action.payload;
    },
    setCopyOrMove: (state, action: PayloadAction<any>) => {
      console.log(action.payload, 'asdfg;lk');
      state.copyOrMove = action.payload;
    },
  },
});
export const {
  setCurrentSelectedUI,
  setSelectedOption,
  setNodeIDs,
  setNavigationPath,
  setIsMoveTo,
  setCurrentMoveToItem,
  setCopyOrMove
} = activestateSlice.actions;
export default activestateSlice.reducer;
