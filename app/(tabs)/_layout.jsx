import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name="home" options={{tabBarIcon:({color, size}) => <Ionicons name="home-outline" size={size} color={color}/>, tabBarLabel:'Home'}}/>
      <Tabs.Screen name="search" options={{tabBarIcon:({color, size}) => <Ionicons name="search-outline" size={size} color={color}/>, tabBarLabel:'Search'}}/>
      <Tabs.Screen name="request" options={{tabBarIcon:({color, size}) => <FontAwesome name="exchange" size={size} color={color}/>, tabBarLabel:'Exchange'}}/>
      <Tabs.Screen name="profile" options={{tabBarIcon:({color, size}) => <Ionicons name="person-circle-outline" size={size} color={color}/>, tabBarLabel:'Profile'}}/>

    </Tabs>
  );
}
