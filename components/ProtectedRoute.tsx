import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { View, Text, Button } from "react-native";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useContext(AuthContext);

  if (!auth?.token) {
    return (
      <View>
        <Text>Bạn cần đăng nhập để truy cập.</Text>
      </View>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
