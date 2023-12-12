import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import routes from "./routes"
import './styles/Home.css'
import './styles/SignUp.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(routes);
root.render(
  
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);