import { createSlice } from '@reduxjs/toolkit';

export const contentSlice = createSlice({
  name: 'content',
  initialState: { contentRef: '' },
  reducers: {
    setContentRef: (state, action) => {
      state.contentRef = JSON.stringify(action.payload);
    },
  },
});

export const { setContentRef } = contentSlice.actions;

export default contentSlice.reducer;
