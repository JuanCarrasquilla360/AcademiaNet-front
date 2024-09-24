// src/context/AuthContext.tsx
import { FC, useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = (username: string, password: string) => {
    console.log(username, password);

    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      navigate("/logged");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
