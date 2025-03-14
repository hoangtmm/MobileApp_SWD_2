import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name="home" options={{tabBarIcon:({color, size}) => <Ionicons name="home-outline" size={size} color={color}/>, tabBarLabel:'Home'}}/>
      <Tabs.Screen name="request" options={{tabBarIcon:({color, size}) => <FontAwesome name="exchange" size={size} color={color}/>, tabBarLabel:'Exchange'}}/>
      <Tabs.Screen name="cart" options={{tabBarIcon:({color, size}) => <AntDesign name="shoppingcart" size={size} color={color}/>, tabBarLabel:'Cart'}}/>
      <Tabs.Screen name="profile" options={{tabBarIcon:({color, size}) => <Ionicons name="person-circle-outline" size={size} color={color}/>, tabBarLabel:'Profile'}}/>

    </Tabs>
  );
}
