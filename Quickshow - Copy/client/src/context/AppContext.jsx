
import { createContext, useContext, useState } from "react";
import axios from "axios";

// Create Context
const AppContext = createContext();

// Custom Hook
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }

  return context;
};

// Provider Component
const AppContextProvider = ({ children }) => {

  // ✅ Admin state (for admin panel)
  const [isAdmin, setIsAdmin] = useState(true); // change later with real auth

  // ✅ Function to check admin (for future backend use)
  const fetchIsAdmin = async () => {
    try {
      // later you can call backend API here
      setIsAdmin(true);
    } catch (error) {
      console.error("Error checking admin:", error);
      setIsAdmin(false);
    }
  };

  // ✅ Base URL (env support)
  const baseURL = import.meta.env.VITE_BASE_URL || "";

  // ✅ Axios instance
  const axiosInstance = axios.create({
    baseURL,
  });

  // ✅ Dummy token (replace with Clerk later)
  const getToken = async () => {
    return "test_token";
  };

  // ✅ Dummy user (replace later)
  const user = true;

  // ✅ Image base URL (TMDB)
  const image_base_url = "https://image.tmdb.org/t/p/w500";

  // ✅ All values exposed to app
  const value = {
    axios: axiosInstance,
    getToken,
    user,
    image_base_url,
    isAdmin,
    fetchIsAdmin,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
