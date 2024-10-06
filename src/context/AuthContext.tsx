import { FC, useState, useEffect, useMemo, createContext } from "react";
import { useNavigate } from "react-router-dom";

type Role = "admin" | "user" | "guest";

interface AuthContextProps {
  isAuthenticated: boolean;
  userRole: Role | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
  const navigate = useNavigate();

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      setUserRole("admin");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "admin");
      navigate("/admin");
      return true;
    } else if (username === "user" && password === "user") {
      setIsAuthenticated(true);
      setUserRole("user");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "user");
      navigate("/user-home");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedRole = localStorage.getItem("userRole") as Role;

    if (storedAuth === "true" && storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }

    setIsLoading(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      userRole,
      isLoading,
      login,
      logout,
    }),
    [isAuthenticated, userRole, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
