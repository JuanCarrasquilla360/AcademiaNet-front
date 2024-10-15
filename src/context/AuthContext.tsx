import { FC, useState, useEffect, useMemo, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/httpService";

type Role = "Admin" | "User" | "guest";

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
    try {
      // Enviar credenciales al backend para autenticarse
      const response = await axiosInstance.post("Accounts/Login", {
        email: username,
        password,
      });

      // Si la autenticación es exitosa, recibirás el token JWT en la respuesta
      const { token } = response.data;

      // Decodificar el token JWT para obtener los roles y otra información
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Almacenar el token en el localStorage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(
        "userRole",
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );

      // Actualizar el estado de autenticación
      setIsAuthenticated(true);
      setUserRole(
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );

      // Redirigir según el rol
      if (
        payload[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] === "Admin"
      ) {
        navigate("/admin");
      } else {
        navigate("/user-home");
      }

      return true;
    } catch (error) {
      console.error("Error durante la autenticación", error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Verificar si el token ha expirado
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp < currentTime) {
        logout(); // Eliminar token y redirigir al login
      } else {
        setIsAuthenticated(true);
        setUserRole(
          payload[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ]
        );
      }
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
