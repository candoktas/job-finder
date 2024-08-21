"use client";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadTokensFromStorage } from "@/app/_components/authSlice";

function LoadToken(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTokensFromStorage());
  }, [dispatch]);

  return <div></div>;
}

export default LoadToken;
