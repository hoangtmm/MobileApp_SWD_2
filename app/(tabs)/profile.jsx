import React, { useContext } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import { UserContext } from "../../context/UserContext";

export default function Profile() {
  const { user, loading, fetchUserProfile } = useContext(UserContext);

  if (loading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <View>
      <Text>Thông tin người dùng:</Text>
      {user ? <Text>{JSON.stringify(user, null, 2)}</Text> : <Text>Chưa có dữ liệu</Text>}
      <Button title="Làm mới" onPress={fetchUserProfile} />
    </View>
  );
}
