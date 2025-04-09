// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Verify token by making a simple request
          await axios.get("https://fakestoreapi.com/users/1", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser({ token });
        } catch (err) {
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({ token });
    toast.success("Logged in successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
