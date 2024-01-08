/* eslint-disable no-alert */
import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { MDBAlert } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const appContext = createContext();

function AppContextProvider({ children }) {
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
      const config = {
        headers: { Authorization: `Bearer ${data.token}` },
      };
      const result = await axios.get("http://localhost:3310/users/me", config);
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
    // const users = getUsers();

    // if (!users.find((userdb) => userdb.email === newUser.email)) {
    //   users.push(newUser);
    //   localStorage.setItem("users", JSON.stringify(users));
    //   // eslint-disable-next-line no-alert
    //   alert(`Bienvenue ${newUser.email}`);
    // } else {
    //   // eslint-disable-next-line no-alert
    //   alert("Vous êtes déjà inscrit !");
    // }
  };

  const logout = () => {
    setUser({ admin: false });
  };

  // exemple méthodes pour communiquer avec une api

  const contextData = useMemo(
    () => ({ isAdmin, setIsAdmin, user, login, logout, register }),
    [isAdmin, setIsAdmin, user, login, logout, register]
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
};

export default AppContextProvider;

export const useAppDemo = () => useContext(appContext);
