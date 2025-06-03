import { Stack } from 'expo-router';
import theme from '../../src/styles/theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: theme.colors.background, // Changé de #f5f5f5 à fond sombre
        },
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{
          title: 'Login',
          headerShown: false, // Caché car on veut le style custom
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{
          title: 'Register',
          headerShown: false, // Caché car on veut le style custom
        }} 
      />
    </Stack>
  );
}