/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  props: {},
  panelArray: [
    {
      headerText: 'To-do',
      colorIcon: '#939AFF',
    },
    {
      headerText: 'In-progress',
      colorIcon: '#FFD976',
    },
    {
      headerText: 'In-review',
      colorIcon: '#4184E9',
    },
    {
      headerText: 'Completed',
      colorIcon: '#36D95A',
    },
  ]
};
export const listSlice = createSlice({
  name: 'list',
  initialState: initialState,
  reducers: {
    addPanelItems: (state, action: PayloadAction<any>) => {
        state.panelArray?.push(action.payload)
    },
  },
});

export const {addPanelItems} = listSlice.actions;
export default listSlice.reducer;
