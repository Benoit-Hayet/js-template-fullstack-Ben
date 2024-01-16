import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdb-react-ui-kit/dist/css/mdb.dark.min.css";
import "mdb-react-multi-carousel/dist/css/multi-carousel.min.css";
import AppContextProvider from "./context/AppContext";
import Demo from "./components/Demo";
import AdminContextProvider from "./context/AdminContext";
import Admin from "./components/Admin";
import AdminDemo from "./components/AdminDemo";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ApiService from "./services/api.service";

const apiService = new ApiService();
let user = null;

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      if (user) {
        return { preloadUser: user };
      }

      try {
        const data = await apiService.get("/users/me");
        user = data;

        return { preloadUser: data };
      } catch (err) {
        console.error(err.message);
        return null;
      }
    },
    element: (
      <AppContextProvider apiService={apiService}>
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
