import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { useAppDemo } from "./context/AppContext";

function App() {
  const { user, logout } = useAppDemo();

  return (
    <div className="container mt-5 d-flex flex-column">
      <Outlet />
      {user?.avatar?.url && (
        <img src={`http://localhost:3310/${user.avatar.url}`} alt="avatar" />
      )}
      <h1>{user?.email ? "Connecté" : "Déconnecté"}</h1>
      <h2>{user?.isAdmin ? "admin" : "not admin"}</h2>
      <Link to="/login" className="my-2">
        Login
      </Link>
      <Link to="/register" className="my-2">
        Register
      </Link>
      <Link to="/demo" className="my-2">
        Demo
      </Link>
      <Link to="/admin/demo" className="my-2">
        Admin
      </Link>
      <button type="button" className="my-2" onClick={logout}>
        logout
      </button>
    </div>
  );
}

export default App;
