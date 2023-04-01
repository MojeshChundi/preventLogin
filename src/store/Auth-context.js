import React, { useState } from "react";
export const AuthContext = React.createContext({
  token: "",
  IsLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const UserIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const logotHandler = () => {
    setToken(null);
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
