"use client";

import Logo from "@/app/_components/Logo";
import LogInModal from "@/app/_components/LogInModal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "@/app/_components/modalSlice";
import SignUpModal from "@/app/_components/SignUpModal";

export default function Home() {
  const { isVisible, modalType } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleLogInModalOpen = () => {
    dispatch(openModal("login"));
  };

  const handleSignUpModalOpen = () => {
    dispatch(openModal("signup"));
  };

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  return (
    <div>
      <nav className="flex justify-between py-4 px-6">
        <Logo />
        <div className="flex gap-8">
          <button
            onClick={handleLogInModalOpen}
            className="bg-white text-black font-light py-1 px-8 shadow-md hover:bg-slate-100 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-100 transform transition-transform duration-150 ease-in-out active:scale-95"
          >
            Login
          </button>
          <button
            onClick={handleSignUpModalOpen}
            className="bg-slate-800 text-white font-light py-1 px-8 shadow-md hover:bg-slate-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transform transition-transform duration-150 ease-in-out active:scale-95"
          >
            Sign Up
          </button>
        </div>
      </nav>
      {modalType === "login" && (
        <LogInModal
          isVisible={isVisible}
          onClose={handleModalClose}
          onSignUp={handleSignUpModalOpen}
        />
      )}
      {modalType === "signup" && (
        <SignUpModal
          isVisible={isVisible}
          onClose={handleModalClose}
          onLogIn={handleLogInModalOpen}
        />
      )}
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-200 text-center border-y border-black">
        <h2 className="font-semibold text-5xl">Best Position Ever Found</h2>
        <p className="p-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing
          <br /> elit, sed do eiusmod tempor incididunt ut labore
          <br /> et dolore magna aliqua.
        </p>
      </main>
    </div>
  );
}
