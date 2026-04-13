import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#111', borderTopColor: '#222' },
        tabBarActiveTintColor: '#E63946',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Accueil', tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} />
      <Tabs.Screen name="training" options={{ title: 'Training', tabBarIcon: ({ color }) => <Ionicons name="barbell" size={24} color={color} /> }} />
      <Tabs.Screen name="catalogue" options={{ title: 'Exercices', tabBarIcon: ({ color }) => <Ionicons name="library" size={24} color={color} /> }} />
      <Tabs.Screen name="nutrition" options={{ title: 'Nutrition', tabBarIcon: ({ color }) => <Ionicons name="nutrition" size={24} color={color} /> }} />
      <Tabs.Screen name="coaches" options={{ title: 'Coaches', tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} /> }} />
      <Tabs.Screen name="maps" options={{ title: 'Carte', tabBarIcon: ({ color }) => <Ionicons name="map" size={24} color={color} /> }} />
      <Tabs.Screen name="progression" options={{ title: 'Stats', tabBarIcon: ({ color }) => <Ionicons name="stats-chart" size={24} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil', tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> }} />
    </Tabs>
  );
}