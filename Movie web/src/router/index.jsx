import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Start from "../pages/start.jsx";
import Detial from "../pages/detial.jsx";
import Login from "../pages/login.jsx";
import SignUp from "../pages/signUp.jsx";
import Layout from "../pages/layout.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Start />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/detail/:id",
        element: <Detial />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      }
    ]
  }
]);

export default router