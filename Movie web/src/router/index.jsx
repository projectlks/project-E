import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Start from "../pages/start.jsx";
import Detial from "../pages/detial.jsx";
import Login from "../pages/login.jsx";
import SignUp from "../pages/signUp.jsx";
import Layout from "../pages/layout.jsx";
import CreateAndEditForm from "../pages/createAndEditForm/createAndEditForm.jsx";
import Movie from "../pages/dashBoard/movie.jsx";

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
        path: "/detailMovie/:id",
        element: <Detial />
      },
      {
        path: "/detailSeries/:id",
        element: <Detial />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/create",
        element: <CreateAndEditForm />
      },
      {
        path: "/edit/:id",
        element: <CreateAndEditForm />
      },
      {
        path: '/movie',
        element: <Movie/>
      }
    ]
  }
]);

export default router