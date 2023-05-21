import { createSlice } from '@reduxjs/toolkit';

export const contentSlice = createSlice({
  name: 'content',
  initialState: { contentRef: null },
  reducers: {
    setContentRef: (state, action) => {
      state.contentRef = action.payload;
    },
  },
});

export const { setContentRef } = contentSlice.actions;

export const selectContentRef = (state) => state.content.contentRef;

export default contentSlice.reducer;
