import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";

export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setTimeout(() => {
          const currentUser = auth.currentUser;
          setUser(currentUser);
          setLoading(false);
        }, 500);
      } catch (error) {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return;
  }

  return user ? Component : <Navigate to={redirectTo} />;
};
