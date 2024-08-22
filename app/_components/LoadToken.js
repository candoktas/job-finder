"use client";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadTokensFromStorage } from "@/app/_store/slices/authSlice";

function LoadToken() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTokensFromStorage());
  }, [dispatch]);

  return <div></div>;
}

export default LoadToken;
