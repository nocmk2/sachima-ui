import React from "react";
import FullPageSpinner from "../components/FullPageSpinner";
const AuthContext = React.createContext();

const AuthProvider = props => {
  if (weAreStillWaitingToGetTheUserData) {
    return <FullPageSpinner />;
  }
  const login = () => {};
  const register = () => {};
  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{ data, login, logout, register }}
      {...props}
    />
  );
};

const useAuth = () => React.useContext(AuthContext);
export { AuthContext, useAuth };
