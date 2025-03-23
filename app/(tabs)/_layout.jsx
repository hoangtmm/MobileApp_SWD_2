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
      try {
        const cartCount = await AsyncStorage.getItem('cartCount');
        setBadgeCount(cartCount ? parseInt(cartCount, 10) : 0);
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };
    const interval = setInterval(getCartCount, 1000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />

      {/* Exchange Tab */}
      <Tabs.Screen
        name="request"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="exchange" size={size} color={color} />
          ),
          tabBarLabel: 'Exchange',
        }}
      />

      {/* Cart Tab */}
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" size={size} color={color} />
          ),
          tabBarLabel: 'Cart',
          tabBarBadge: badgeCount >= 0 ? badgeCount : null,
          tabBarBadgeStyle: { backgroundColor: 'red', color: 'white' },
        }}
      />

      {/* Profile Tab */}
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
