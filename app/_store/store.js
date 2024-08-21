import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "@/app/_components/modalSlice";
import { authSlice } from "@/app/_components/authSlice";
import { jobSlice } from "@/app/_components/jobSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    auth: authSlice.reducer,
    jobs: jobSlice.reducer,
  },
});
