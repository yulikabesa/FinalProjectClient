import AuthContext from "./auth-context";
import { useEffect, useState, type ReactNode } from "react";

export type IUser = {
  email: string;
  isAdmin: boolean;
  name: string;
  personalNumber: string;
  __v: number;
  _id: string;
};

// Helper function to safely get initial values
const getInitialToken = () => localStorage.getItem("authToken");
const getInitialUser = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

// const calculateRemainingTime = (expirationTime: string) => {
//   const currentTime = new Date().getTime();
//   const adjExpirationTime = new Date(expirationTime).getTime();

//   const remainingDuration = adjExpirationTime - currentTime;

//   return remainingDuration;
// };

// const retrieveStoredToken = () => {
//   const storedToken = localStorage.getItem("token");
//   const storedExpirationDate = localStorage.getItem("expirationTime");

//   const remainingTime = calculateRemainingTime(storedExpirationDate);

//   if (remainingTime <= 3600) {
//     localStorage.removeItem("token");
//     localStorage.removeItem("expirationTime");
//     return null;
//   }

//   return {
//     token: storedToken,
//     duration: remainingTime,
//   };
// };

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(getInitialToken());
  const [user, setUser] = useState<IUser | null>(getInitialUser());

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
  }, []); // Empty dependency array ensures it runs once on mount

  const isLoggedIn = !!token; // false if empty

  const loginHandler = (token: string, user: IUser) => {
    setToken(token);
    localStorage.setItem("authToken", token); // Persist token
    localStorage.setItem("user", JSON.stringify(user)); // Persist user
    setUser(user);
  };

  const updateHandler = (user: IUser) => {
    localStorage.setItem("user", JSON.stringify(user)); // Persist user
    setUser(user);
  };

  const logoutHandler = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  const authContext = {
    isLoggedIn: isLoggedIn,
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
