import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAppDemo } from "./AppContext";

const adminContext = createContext();

function AdminContextProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(true);
  const { user } = useAppDemo();

  if (user.isAdmin !== 1) {
    return <Navigate to="/demo" />;
  }

  const adminData = useMemo(
    () => ({ isAdmin, setIsAdmin }),
    [isAdmin, setIsAdmin]
  );

  // méthodes supplémentaires pour protéger des routes liées à l'administrateur

  return (
    <adminContext.Provider value={adminData}>{children}</adminContext.Provider>
  );
}

AdminContextProvider.propTypes = {
  children: PropTypes.string.isRequired,
};

export default AdminContextProvider;

export const useAdmin = () => useContext(adminContext);
