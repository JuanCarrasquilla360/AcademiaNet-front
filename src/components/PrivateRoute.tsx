import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode"; // Importación corregida

// Decodificar el token JWT
interface DecodedToken {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  FirstName: string;
  LastName: string;
  Photo: string;
  InstitutionID: string;
  exp: number;
}

const PrivateRoute: FC<{ children: ReactNode; allowedRoles: string[] }> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const token = localStorage.getItem("jwtToken");

  // Lógica para verificar el token y extraer el rol
  const isTokenValid = () => {
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token); // Decodificar el token
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        // Verificar si el token ha expirado
        if (decodedToken.exp > currentTime) {
          return true;
        }
      } catch (error) {
        console.error("Token inválido", error);
        return false;
      }
    }
    return false;
  };

  if (isLoading) {
    // Mientras se carga la autenticación, mostramos un indicador de carga
    return <div>Loading...</div>; // Puedes reemplazarlo con un componente de loading
  }

  
  // Si no está autenticado o el token no es válido
  if (!isAuthenticated || !isTokenValid()) {
    return <Navigate to="/login" />;
  }

  // Extraer el rol desde el token decodificado
  const decodedToken = token ? jwtDecode<DecodedToken>(token) : null;
  const userRoleFromToken =
    decodedToken?.[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ]; // Extraer el rol
console.log(userRoleFromToken);

  // Verificar si el rol está permitido
  if (userRoleFromToken && allowedRoles.includes(userRoleFromToken)) {
    return <>{children}</>;
  }

  // Si no tiene permiso, redirigimos a una página de acceso denegado
  return <Navigate to="/not-authorized" />;
};

export default PrivateRoute;
