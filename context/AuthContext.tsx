import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "@/config";


interface AuthContextType {
  user: any;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
      }
    };
    loadToken();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/connect/token`,
        new URLSearchParams({
          grant_type: "password",
          client_id: "service_client",
          client_secret: "SWD392-LamNN15-GROUP3-SPRING2025",
          username: username,
          password: password,
          UserNameOrEmail: username,
        }).toString(),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },

        }
      );

      const { access_token } = response.data;
      if (!access_token) throw new Error("Invalid token received");

      await AsyncStorage.setItem("token", access_token);
      setToken(access_token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
