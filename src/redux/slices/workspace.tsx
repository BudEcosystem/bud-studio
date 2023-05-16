import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  props: {},
  color: '#939AFF',
};
export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    changeColor: (state, action: PayloadAction<any>) => {
      state.color = action.payload;
    },
    changeWorkSpacePropereties: (state, action: PayloadAction<any>) => {
      state.props = { ...state.props, ...action.payload };
    },
  },
});

export const { changeColor, changeWorkSpacePropereties } =
  workspaceSlice.actions;
export default workspaceSlice.reducer;
