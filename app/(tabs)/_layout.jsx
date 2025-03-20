import React, { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabLayout() {
  const [badgeCount, setBadgeCount] = useState(0);

  useEffect(() => {
    const getCartCount = async () => {
      const count = await AsyncStorage.getItem('cartCount');
      setBadgeCount(count ? parseInt(count, 10) : 0);
    };

    const interval = setInterval(getCartCount, 1000); // Cập nhật mỗi giây
    return () => clearInterval(interval);
  }, []);

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="request"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="exchange" size={size} color={color} />
          ),
          tabBarLabel: 'Exchange',
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" size={size} color={color} />
          ),
          tabBarLabel: 'Cart',
          tabBarBadge: badgeCount > 0 ? badgeCount : null,
          tabBarBadgeStyle: { backgroundColor: 'red', color: 'white' },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tabs>
  );
}
