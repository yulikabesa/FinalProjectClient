import React from "react";
import type{ IUser } from "./authProvider";

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  user: IUser | null;
  token: string | null;
  update: (user: IUser) => void;
  login: (
    token: string,
    user: IUser
  ) => void;
  logout: () => void;
}

// for future register type- userData: {email: string, password: string}

const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  isAdmin: false,
  user: null,
  token: "",
  update: (user) => {},
  login: (token, user) => {},
  logout: () => {},
});

export default AuthContext;
