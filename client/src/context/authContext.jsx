import { createContext, useState } from 'react';

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <authContext.Provider value={{ setUser, user }}>
      {children}
    </authContext.Provider>
  );
};
