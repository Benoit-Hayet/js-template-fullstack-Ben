import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAppDemo } from "./AppContext";

const adminContext = createContext();

function AdminContextProvider({ children }) {
  const { isAdmin } = useAppDemo();

  // méthodes supplémentaires pour protéger des routes liées à l'administrateur

  return isAdmin ? (
    <adminContext.Provider value={isAdmin}>{children}</adminContext.Provider>
  ) : (
    <Navigate to="/demo" />
  );
}

AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminContextProvider;

export const useAdmin = () => useContext(adminContext);
