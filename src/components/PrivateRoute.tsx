import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute: FC<{ children: ReactNode; allowedRoles: string[] }> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, userRole, isLoading } = useAuth();

  if (isLoading) {
    // Mientras se carga la autenticación, podemos mostrar un indicador de carga
    return <div>Loading...</div>; // Puedes reemplazarlo con un componente de loading de tu preferencia
  }

  if (!isAuthenticated) {
    // Si no está autenticado, redirigimos al login
    return <Navigate to="/login" />;
  }

  if (userRole && allowedRoles.includes(userRole)) {
    // Si el rol es permitido, mostramos el contenido
    return <>{children}</>;
  }

  // Si no tiene permiso, redirigimos a una página de acceso denegado
  return <Navigate to="/not-authorized" />;
};

export default PrivateRoute;
