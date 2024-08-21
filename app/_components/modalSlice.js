import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isVisible: false,
    modalType: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isVisible = true;
      state.modalType = action.payload;
    },
    closeModal: (state) => {
      state.isVisible = false;
      state.modalType = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
