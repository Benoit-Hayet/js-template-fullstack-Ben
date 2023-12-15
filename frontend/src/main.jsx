import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "mdb-react-ui-kit/dist/css/mdb.dark.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdb-react-multi-carousel/dist/css/multi-carousel.min.css";
import AppContextProvider from "./context/AppContext";
import Demo from "./components/Demo";
import AdminContextProvider from "./context/AdminContext";
import Admin from "./components/Admin";
import AdminDemo from "./components/AdminDemo";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppContextProvider>
        <App />
      </AppContextProvider>
    ),
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/demo", element: <Demo /> },
      {
        path: "/admin",
        element: (
          <AdminContextProvider>
            <Admin />
          </AdminContextProvider>
        ),
        children: [{ path: "/admin/demo", element: <AdminDemo /> }],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
