import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LangueProvider } from './LangueContext';

export default function RootLayout() {
  return (
    <LangueProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="programme/[id]" />
        <Stack.Screen name="booking/[coach]" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="parametres" />
        <Stack.Screen name="timer" />
      </Stack>
    </LangueProvider>
  );
}