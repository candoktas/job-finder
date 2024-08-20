"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/app/_components/authSlice";

function Logout(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <button
      className=" text-black font-light py-1 px-4 hover:bg-slate-100 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-100 transform transition-transform duration-150 ease-in-out active:scale-95"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default Logout;
