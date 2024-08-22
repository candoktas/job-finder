import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearError, registerUser } from "@/app/_store/slices/authSlice";

function SignUpModal({ isVisible, onClose, onLogIn }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!isVisible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      return;
    }

    const resultAction = await dispatch(registerUser({ email, password }));

    if (registerUser.fulfilled.match(resultAction)) {
      setSuccessMessage("Sign up successful! Please log in.");
    }
  };

  const handleClose = () => {
    dispatch(clearError());
    setSuccessMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          className="absolute top-1 right-4 text-3xl text-gray-700 hover:text-gray-300 transition-colors duration-200"
          onClick={handleClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="hr@shft.co"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-gray-500 text-sm mt-1">
              Password must be at least 8 characters long.
            </div>

            {password.length > 0 && password.length < 8 && (
              <div className="text-red-500 text-sm mt-2">
                Password is too short
              </div>
            )}

            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors duration-200 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center">
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {successMessage && (
          <p className="text-green-500 text-center mt-4">{successMessage}</p>
        )}

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <button
            className="text-blue-500 hover:text-blue-300"
            onClick={onLogIn}
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUpModal;
