import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import "./styles/Home.css";
import "./styles/SignUp.css";

import UserProvider from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter(routes);
root.render(
  <React.StrictMode>
    <UserProvider>
      
        <RouterProvider router={router} />
      
    </UserProvider>
  </React.StrictMode>
);
