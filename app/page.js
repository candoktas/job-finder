"use client";

import Logo from "@/app/_components/Logo";
import LogInModal from "@/app/_components/LogInModal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "@/app/_components/modalSlice";
import SignUpModal from "@/app/_components/SignUpModal";
import { useEffect } from "react";
import { loadTokensFromStorage } from "@/app/_components/authSlice";

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
      <nav className="sticky top-0 z-10 bg-white flex justify-center items-center py-4 px-6 flex-wrap sm:justify-between">
        <Logo />
        <div className="flex gap-6">
          <button
            onClick={handleLogInModalOpen}
            className="bg-primary min-w-28 max-h-8 text-secondary font-light py-1 px-8 shadow-md hover:bg-lime-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-100 transform transition-transform duration-150 ease-in-out active:scale-95"
          >
            Login
          </button>
          <button
            onClick={handleSignUpModalOpen}
            className="bg-secondary min-w-28 max-h-8 text-white font-light py-1 px-5 shadow-md hover:bg-cyan-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transform transition-transform duration-150 ease-in-out active:scale-95"
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-primary from-10% to-slate-200 to-70% text-center">
        <h2 className="font-semibold text-5xl">Best Position Ever Found</h2>
        <p className="p-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing
          <br /> elit, sed do eiusmod tempor incididunt ut labore
          <br /> et dolore magna aliqua.
        </p>
      </main>
      <footer>
        <div className="text-secondary bg-gradient-to-r from-white from-10% via-indigo-100 via-40% to-yellow-100 to-80% flex flex-col sm:flex-row p-6 sm:p-14">
          <div className="w-full sm:w-1/2 flex flex-col sm:flex-row">
            <Logo />
            <div className="pr-10">
              <p className="font-semibold mb-4">Ready to get started?</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo
              </p>
            </div>
          </div>
          <div className="hidden sm:block min-h-full border-l border-gray-300 mx-4"></div>
          <div className="w-full sm:w-1/2 pl-0 sm:pl-10 flex flex-col justify-end">
            <p>&copy; 2010 &mdash; 2024 Privacy &mdash; Terms</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
