import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { useAppDemo } from "./context/AppContext";

function App() {
  const { user, logout } = useAppDemo();

  return (
    <div className="container mt-5">
      <Outlet />
      <h1>{user?.email ? "Connecté" : "Déconnecté"}</h1>
      <h2>{user.isAdmin ? "admin" : "not admin"}</h2>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/admin/demo">Admin</Link>
      <button type="button" onClick={logout}>
        logout
      </button>
    </div>
  );
}

export default App;
