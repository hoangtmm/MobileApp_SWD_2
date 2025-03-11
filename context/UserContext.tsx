import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { API_USER_URL } from "@/config";

interface UserContextType {
  user: any;
  loading: boolean;
  fetchUserProfile: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (authContext?.token) {
      fetchUserProfile();
    } else {
      setUser(null);
    }
  }, [authContext?.token]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = authContext?.token;
      if (!token) {
        console.error("Không tìm thấy token!");
        setUser(null);
        return;
      }
      console.log("🔑 Token:", token);
      const url = `${API_USER_URL}/api/v1/UDSSelectUserProfile`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("📄 Thông tin người dùng:", data);
      setUser(data);
    } catch (error: any) {
      console.error("❌ Lỗi khi lấy thông tin người dùng:", error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, fetchUserProfile, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
