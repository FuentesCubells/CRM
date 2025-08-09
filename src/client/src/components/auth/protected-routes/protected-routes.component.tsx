import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../../../services/auth.service";

const ProtectedRoute: React.FC<{ children: any }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const user = await checkAuth();
      setIsAuthenticated(!!user);
      setIsLoading(false);
    };
    verify();
  }, []);

  if (isLoading) return <p>...Loading</p>;

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
