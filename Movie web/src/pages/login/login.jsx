import React, { useRef, useState } from 'react';
import Email from "./email";
import Password from './password';
import UserName from './userName';
import SingupEmail from "./signupEmail";
import SingupPassword from "./signupPassword";


import left from "../../assets/left.svg";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSwitch, setIsSwitch] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const navigate = useNavigate();

  const complete = () => {
    if (username && email && password) {
      navigate("/home");
    } else {
      if (!username) setUsernameError(true);
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
    }
  };

  const handelEnter = (e) => {
    if (e.key === 'Enter' || e.key === 'ArrowDown') {
      if (e.target === usernameRef.current ) {
        emailRef.current.focus();
      }
      if (e.target === emailRef.current) {
        passwordRef.current.focus();
      }
      if (e.target === passwordRef.current) {
        complete();
      }
    }
  };

  return (
    <>
      <section className="w-full">
        <section className="max-w-lg w-[90%] mx-auto h-screen flex items-center justify-center overflow-y-auto overflow-x-hidden transition-all transform relative">
          <div
            className={`w-full pb-2 p-8 rounded-lg transition-all absolute bg-blue-800 bg-opacity-20 ${
              !isSwitch ? "left-0 delay-300" : "-left-full"
            }`}
          >
            <h1 className="text-4xl font-bold w-full mb-6">Login</h1>

            <Email
              email={email}
              setEmail={setEmail}
              emailRef={emailRef}
              handelEnter={handelEnter}
              emailError={emailError}
              setEmailError={setEmailError}
            />
            <Password
              password={password}
              setPassword={setPassword}
              passwordRef={passwordRef}
              handelEnter={handelEnter}
              passwordError={passwordError}
              setPasswordError={setPasswordError}
            />
            <div className="w-full flex justify-center">
              <h1
                onClick={complete}
                className="w-[80%] mb-2 transition-all py-2 font-bold text-center bg-blue-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg"
              >
                Login
              </h1>
            </div>
            <div className="flex space-x-1 justify-center">
              <p>If you don't have an account.</p>
              <p
                className="cursor-pointer hover:text-blue-500"
                onClick={() => setIsSwitch(true)}
              >
                Create an Account
              </p>
            </div>
          </div>
          {/* sign Up Form */}
          <div
            className={`w-full pb-2 p-8 rounded-lg transition-all absolute bg-blue-800 bg-opacity-20 ${
              isSwitch ? "right-0 delay-300" : "-right-full"
            }`}
          >
            <h1 className="text-4xl font-bold w-full mb-6">SignUp</h1>
            <UserName
              username={username}
              setUsername={setUsername}
              usernameRef={usernameRef}
              handelEnter={handelEnter}
              usernameError={usernameError}
              setUsernameError={setUsernameError}
            />

            <SingupEmail
              email={email}
              setEmail={setEmail}
              emailRef={emailRef}
              handelEnter={handelEnter}
              emailError={emailError}
              setEmailError={setEmailError}
            />
            <SingupPassword
              password={password}
              setPassword={setPassword}
              passwordRef={passwordRef}
              handelEnter={handelEnter}
              passwordError={passwordError}
              setPasswordError={setPasswordError}
            />

            <div className="w-full flex justify-center">
              <button
                type="button"
                onClick={complete}
                className="w-[80%] mb-2 transition-all py-2 font-bold text-center bg-blue-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg"
              >
                Sign Up
              </button>
            </div>
            <div className="flex space-x-1 justify-center">
              <p>If you have an account.</p>
              <p
                className="cursor-pointer hover:text-blue-500"
                onClick={() => setIsSwitch(false)}
              >
                Log In
              </p>
            </div>
          </div>
        </section>

        <img
          src={left}
          className="absolute w-10 h-10 top-3 left-3"
          alt=""
          onClick={() => navigate(-1)}
        />
      </section>
    </>
  );
}
