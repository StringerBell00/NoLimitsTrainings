import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LangueProvider } from './LangueContext';
import { AuthProvider } from './AuthContext';
import { ThemeProvider, useTheme } from './ThemeContext';

function AppStack() {
  const { themeId } = useTheme();
  return (
    <>
      <StatusBar style={themeId === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="splash" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="programme/[id]" />
        <Stack.Screen name="seance/[id]" />
        <Stack.Screen name="booking/[coach]" />
        <Stack.Screen name="chat/[coach]" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="parametres" />
        <Stack.Screen name="timer" />
        <Stack.Screen name="recherche" />
        <Stack.Screen name="historique" />
        <Stack.Screen name="defis" />
        <Stack.Screen name="premium" />
        <Stack.Screen name="boutique" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LangueProvider>
          <AppStack />
        </LangueProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}