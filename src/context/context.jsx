import { createContext, useState } from "react";

export const context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const Addwrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  return (
    <context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default Addwrapper;
