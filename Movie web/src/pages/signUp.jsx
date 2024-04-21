import React, { useState } from "react";
import eyeOpen from "../assets/eyeOpen.svg";
import eyeClose from "../assets/eyeClose.svg";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Function to handle form submission
  const handleSignIn = () => {
    if (email !== "" && password !== "") {
      navigate("/home");
    }
    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
  };

  return (
    <>
      {/* Login Form */}
      <section className="flex justify-center items-center mx-auto w-[90%] md:w-full h-screen">
        {/* back button */}

        <Link to="/home" className="absolute top-3 left-3 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </Link>
        <div className="w-full max-w-[450px]">
          <form className="bg-blue-500 bg-opacity-20 shadow-md rounded px-6 pt-6 pb-3 mb-4">
            {/* Title */}
            <h1 className="w-full text-center text-4xl mb-4 font-bold">
              SIGNUP
            </h1>
            {/* Email Input */}
            <div className="mb-4">
              <label
                className="block text-gray-50 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none  text-white border-gray-50 bg-blue-500 bg-opacity-20 focus:border-blue-800 focus:bg-blue-900 focus:bg-opacity-20  border outline-none rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(false);
                }}
              />
            </div>
            {/* Email Error Message */}
            {emailError && (
              <div className="text-red-500 text-sm mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4 inline mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
                Please enter a valid email address.
              </div>
            )}

            {/* Password Input */}
            <div className="mb-6">
              <label
                className="block text-gray-50 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative  mb-3">
                <input
                  className="shadow border-gray-50 bg-blue-500 bg-opacity-20 focus:border-blue-800 focus:bg-blue-900 focus:bg-opacity-20 outline-none appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type={isShow ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                />
                {/* Password Visibility Toggle */}
                <div className="absolute top-1/2 transform -translate-y-1/2 right-3">
                  {isShow ? (
                    <img
                      src={eyeOpen}
                      className="h-5 w-5"
                      alt="eyeOpen"
                      onClick={() => setIsShow(false)}
                    />
                  ) : (
                    <img
                      src={eyeClose}
                      className="h-5 w-5"
                      alt="eyeClose"
                      onClick={() => setIsShow(true)}
                    />
                  )}
                </div>
              </div>
              {/* Password Error Message */}
              {passwordError && (
                <div className="text-red-500 text-sm mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.5 6c0-2.209 1.791-4 4-4h7c2.209 0 4 1.791 4 4v2c0 2.209-1.791 4-4 4H6.5c-2.209 0-4-1.791-4-4V6zm11 4H7.5c-1.654 0-3-1.346-3-3V7h12v.5c0 1.654-1.346 3-3 3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Password must be at least 8 characters long.
                </div>
              )}
            </div>

            {/* Sign In Button */}
            <div className="flex items-center justify-center mb-3">
              <button
                className="bg-blue-500 w-[100px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSignIn}
              >
                Sign Up
              </button>
            </div>

            {/* Forgot Password Link */}
            {/* <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a> */}

            <p className="w-full text-center">
              If you have an account .
              <Link to="/login" className="hover:text-blue-500">
                {" "}
                LogIn
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
