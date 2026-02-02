import AuthContext from "./auth-context";
import { useState, useEffect, useCallback, type ReactNode } from "react";

export type IUser = {
  email: string;
  isAdmin: boolean;
  name: string;
  personalNumber: string;
  __v: number;
  _id: string;
};

let logoutTimer: number;

const calculateRemainingTime = (expirationTime: string) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("authToken");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  if (!storedExpirationDate) return null;
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const getInitialUser = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const tokenData = retrieveStoredToken();
  const [user, setUser] = useState<IUser | null>(getInitialUser());

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken || null);

  const userIsLoggedIn = !!token; // false if empty

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token: string, user: IUser, expirationTime: string) => {
    setToken(token);
    localStorage.setItem("authToken", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("user", JSON.stringify(user)); // Persist user
    setUser(user);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    // This effect runs only once when the provider mounts
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, []); // Empty dependency array ensures it runs once on mount

  const updateHandler = (user: IUser) => {
    localStorage.setItem("user", JSON.stringify(user)); // Persist user
    setUser(user);
  };

  const authContext = {
    isLoggedIn: userIsLoggedIn,
    isAdmin: user?.isAdmin || false,
    user: user,
    token: token,
    update: updateHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
