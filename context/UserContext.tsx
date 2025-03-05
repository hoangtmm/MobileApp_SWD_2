import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_USER_URL } from "@/config";
import { AuthContext } from "./AuthContext";
interface UserContextType {
  user: any;
  loading: boolean;
  fetchUserProfile: () => Promise<void>;
}
export const UserContext = createContext<UserContextType | null>(null);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (authContext?.token) {
      fetchUserProfile();
    }
  }, [authContext?.token]);
  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("🔑 Token hiện tại:", token); 
      if (!token) throw new Error("Không tìm thấy token!");
  
      const response = await axios.post(
       `${API_USER_URL}/api/v1/UDSSelectUserProfile`,
        { isOnlyValidation: false,
         },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setUser(response.data);
    } catch (error) {
      console.error("❌ Lỗi khi lấy thông tin người dùng:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <UserContext.Provider value={{ user, loading, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};
