import React, { ReactNode, createContext, useContext, useState } from 'react';

export const loginContextState = {
  login: false,
  setLogin: () => {},
};

export const LoginContext = createContext(loginContextState);

export const LoginProvider = ({ children }) => {
  const [login, setLoginValue] = useState<boolean>(false);

  const setLogin = (loginValue) => {
    setLoginValue(loginValue);
  };

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};