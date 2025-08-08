// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../../../services/auth.service";

const ProtectedRoute: React.FC<any> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = getToken();
      if( storedToken ) setIsLoading(false);
      setToken(storedToken);
    };

    checkAuth();
  }, []);

  if( isLoading) return <p>...Loading</p>
  return token ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
