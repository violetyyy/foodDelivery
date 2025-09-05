"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load user data from localStorage on initialization
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("userToken");
      const savedUser = localStorage.getItem("userData");
      
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  // Save user data to localStorage whenever user or token changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (token && user) {
        localStorage.setItem("userToken", token);
        localStorage.setItem("userData", JSON.stringify(user));
      } else {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
      }
    }
  }, [user, token]);

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
    }
  };

  const isAuthenticated = !!user && !!token;

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;