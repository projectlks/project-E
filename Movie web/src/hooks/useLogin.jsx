import React, { useState } from "react";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logIn = async (email, password) => {
    try {
      setLoading(true);
      let res = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      setError(null);
      return res.user;
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  return { loading, error, logIn };
}
