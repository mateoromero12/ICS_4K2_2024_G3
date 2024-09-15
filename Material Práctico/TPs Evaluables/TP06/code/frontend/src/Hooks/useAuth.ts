import { useState, useEffect, useCallback } from "react";
import { login as apiLogin } from "../Service/apiService";
import { useNavigate } from "react-router-dom";
import { User } from "../Types/User";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const saveUserToLocalStorage = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  };

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    try {
      const userData = await apiLogin(email, password);
      console.log("Datos de usuario:", userData);
      setUser(userData);
      saveUserToLocalStorage(userData);
      setError(null);
      navigate(userData.role === "dador" ? "/dador" : "/transportista");
    } catch (error) {
      console.error("Error en el login:", error);
      setError("Email o contraseña incorrectos");
    }
  }, [navigate]);

  const logout = useCallback((): void => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const storedUser = loadUserFromLocalStorage();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return { user, login, logout, error };
};

export default useAuth;
