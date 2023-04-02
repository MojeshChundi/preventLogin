import React, { useState } from "react";
export const AuthContext = React.createContext({
  token: "",
  IsLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const UserIsLoggedIn = !!token;

  const loginHandler = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logotHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const contextValue = {
    token: token,
    IsLoggedIn: UserIsLoggedIn,
    login: loginHandler,
    logout: logotHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
