import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM0qoUWsUUmWapSCHK9SpG2SXRNj3yMLo",
  authDomain: "movie-web-c1124.firebaseapp.com",
  projectId: "movie-web-c1124",
  storageBucket: "movie-web-c1124.appspot.com",
  messagingSenderId: "241855544392",
  appId: "1:241855544392:web:79ea50cf97147d911c2c7d",
  measurementId: "G-43EHWSD2M3"
};

const app = initializeApp(firebaseConfig);

let auth = getAuth(app);

export { auth}