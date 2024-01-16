/* eslint-disable no-alert */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { MDBAlert } from "mdb-react-ui-kit";
import { useLoaderData, useNavigate } from "react-router-dom";
import ApiService from "../services/api.service";

const appContext = createContext();

function AppContextProvider({ children, apiService }) {
  const givenData = useLoaderData();
  const [isAdmin, setIsAdmin] = useState(givenData?.preloadUser?.data?.isAdmin);
  const [user, setUser] = useState(givenData?.preloadUser?.data);
  const [basicDanger, setBasicDanger] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setUser(undefined);
    setIsAdmin(false);
    localStorage.clear();
    return navigate("/demo");
  };

  const getProfile = async () => {
    try {
      const result = await apiService.get("/users/me");
      alert(`Content de vous revoir ${result.data.email}`);
      setUser(result.data);
      setIsAdmin(result.data.isAdmin === 1);
      if (result.data.isAdmin === 1) {
        return navigate("/admin/demo");
      }
      return navigate("/demo");
    } catch (err) {
      console.error(err.error ?? err.message);
      logout();
    }

    return null;
  };

  const login = async (credentials) => {
    try {
      apiService.setToken(undefined);
      const data = await apiService.post(`/login`, credentials);
      localStorage.setItem("token", data.token);
      apiService.setToken(data.token);
      return await getProfile();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    return null;
  };

  const register = async (newUser) => {
    try {
      setUser(await apiService.post("/users", newUser));
      alert(`Bienvenue ${newUser.email}`);
      return await login(newUser);
    } catch (err) {
      alert(err.message);
    }
    return null;
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
  }, [user, isAdmin]);

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
