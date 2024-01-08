/* eslint-disable no-alert */
import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { MDBAlert } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiService from "../services/api.service";

const appContext = createContext();

function AppContextProvider({ children, apiService }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({ admin: false });
  const [basicDanger, setBasicDanger] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3310/login`,
        credentials
      );
      localStorage.setItem("token", data.token);
      // const config = {
      //   headers: { Authorization: `Bearer ${data.token}` },
      // };
      // apiService.setToken(data.token);
      // console.log(apiService.getToken());
      const result = await apiService.get("http://localhost:3310/users/me");
      // const result = await axios.get("http://localhost:3310/users/me", config);
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
    setUser({ admin: false });
    setIsAdmin(false);
    localStorage.clear();
  };

  // exemple méthodes pour communiquer avec une api

  const contextData = useMemo(
    () => ({ isAdmin, setIsAdmin, user, login, logout, register, apiService }),
    [isAdmin, setIsAdmin, user, login, logout, register, apiService]
  );

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
  children: PropTypes.string.isRequired,
  apiService: PropTypes.instanceOf(ApiService).isRequired,
};

export default AppContextProvider;

export const useAppDemo = () => useContext(appContext);
