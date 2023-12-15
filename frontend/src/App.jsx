import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { useAppDemo } from "./context/AppContext";

function App() {
  const { user } = useAppDemo();

  return (
    <div className="container mt-5">
      <Outlet />
      <h1>{user.admin ? "Connecté" : "Déconnecté"}</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default App;
