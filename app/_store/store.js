import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "@/app/_store/slices/modalSlice";
import { authSlice } from "@/app/_store/slices/authSlice";
import { jobSlice } from "@/app/_store/slices/jobSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    auth: authSlice.reducer,
    jobs: jobSlice.reducer,
  },
});
