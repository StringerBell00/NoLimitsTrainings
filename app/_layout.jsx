import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}<Tabs.Screen
  name="maps"
  options={{
    title: 'Carte',
    tabBarIcon: ({ color }) => <Ionicons name="map" size={24} color={color} />
  }}
/>