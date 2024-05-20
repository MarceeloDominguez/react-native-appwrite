import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentUser } from "../lib/appwrite";

type ContextProps = {
  isLoggedIn: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
  isLoading: boolean;
};

const GlobalContext = createContext({} as ContextProps);

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoading,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
