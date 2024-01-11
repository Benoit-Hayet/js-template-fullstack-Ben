/* eslint-disable no-alert */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { MDBAlert } from "mdb-react-ui-kit";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import ApiService from "../services/api.service";

const appContext = createContext();

function AppContextProvider({ children, apiService }) {
  const givenData = useLoaderData();
  const [isAdmin, setIsAdmin] = useState(givenData?.preloadUser?.data?.isAdmin);
  const [user, setUser] = useState(givenData?.preloadUser?.data);
  const [basicDanger, setBasicDanger] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const data = await apiService.post(
        `http://localhost:3310/login`,
        credentials
      );
      localStorage.setItem("token", data.token);

      apiService.setToken(data.token);

      const result = await apiService.get("http://localhost:3310/users/me");

      alert(`Content de vous revoir ${result.data.email}`);
      setUser(result.data);
      if (result.data.isAdmin === 1) {
        return navigate("/admin/demo");
      }
      return navigate("/demo");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    return null;
  };

  const register = async (newUser) => {
    try {
      setUser(await axios.post("http://localhost:3310/users", newUser));
      alert(`Bienvenue ${newUser.email}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = () => {
    setUser(undefined);
    setIsAdmin(false);
    localStorage.clear();
    return navigate("/demo");
  };

  // exemple méthodes pour communiquer avec une api

  const contextData = useMemo(
    () => ({ isAdmin, setIsAdmin, user, login, logout, register, apiService }),
    [isAdmin, setIsAdmin, user, login, logout, register, apiService]
  );
  useEffect(() => {
    if (isAdmin) {
      return navigate("/admin/demo");
    }

    return navigate("/demo");
  }, []);
  return (
    <appContext.Provider value={contextData}>
      {children}
      <MDBAlert
        color="danger"
        autohide
        position="top-right"
        delay={2000}
        appendToBody
        open={basicDanger}
        onClose={() => setBasicDanger(false)}
      >
        Identifiants incorrects !
      </MDBAlert>
    </appContext.Provider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  apiService: PropTypes.instanceOf(ApiService).isRequired,
};

export default AppContextProvider;

export const useAppDemo = () => useContext(appContext);
