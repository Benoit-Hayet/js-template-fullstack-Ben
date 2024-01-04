import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { useAppDemo } from "./context/AppContext";

function App() {
  const { user } = useAppDemo();

  return (
    <div className="container mt-5">
      <Outlet />
      <h1>{user ? "Connecté" : "Déconnecté"}</h1>
      <h2>{user.is_admin ? "admin" : "not admin"}</h2>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/admin/demo">Admin</Link>
    </div>
  );
}

export default App;
