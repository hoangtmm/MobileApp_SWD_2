import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import {useFonts} from "expo-font"
import { AuthProvider } from '@/context/AuthContext'
import { UserProvider } from "@/context/UserContext";
export default function RootLayout() {
  
  useFonts({
    'outfit' : require('@/assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('@/assets/fonts/Outfit-Bold.ttf'),
  })
 
  return (
   <AuthProvider>
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
      </UserProvider>
    </AuthProvider>
  

  )
}