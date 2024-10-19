import { FC, useState, useEffect, useMemo, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/httpService";
import { useTranslation } from "react-i18next";

type Role = "Admin" | "User" | "guest";

interface AuthContextProps {
  isAuthenticated: boolean;
  userRole: Role | null;
  username: string | null;
  email: string | null;
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
  const { t } = useTranslation();
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
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
      setUsername(payload.FirstName + " " + payload.LastName);
      setEmail(
        payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
      );
      setUserRole(
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );

      // Redirigir según el rol
      if (
        payload[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] === "Admin"
      ) {
        navigate("/home");
      } else {
        navigate("/");
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
    setUsername(t("guest"));
    setEmail(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log(payload);

      // Verificar si el token ha expirado
      console.log(payload);
      setUsername(payload.FirstName + " " + payload.LastName);
      setEmail(
        payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
      );
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
      setUsername(t("guest"));
      setEmail(null);
    }

    setIsLoading(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      userRole,
      username,
      email,
      isLoading,
      login,
      logout,
    }),
    [isAuthenticated, userRole, isLoading, username, email]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
