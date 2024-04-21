import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './router/index.jsx'
import { RouterProvider, useLocation } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
 
      <section className="hwere">
        <RouterProvider router={router} />
      </section>
   
);
