import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './router/index.jsx'
import { RouterProvider, useLocation } from "react-router-dom";
// import {DetailUrlContextProvider} from './content/detailUrlContextt.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  // <section className="hwere">
  //   <DetailUrlContextProvider>
  //
  //   </DetailUrlContextProvider>
  // </section>

  <RouterProvider router={router} />
);
