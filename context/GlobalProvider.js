import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/api"; 

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false); 
  const [user, setUser] = useState(null);        
  const [loading, setLoading] = useState(true);  
  const [globalError, setGlobalError] = useState('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setIsLogged(true);
          setUser(currentUser);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.log('Error in GlobalProvider:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        globalError,
        setGlobalError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
