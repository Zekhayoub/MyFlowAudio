import { Stack } from 'expo-router';
import theme from '../../src/styles/theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{
          title: 'Login',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{
          title: 'Register',
          headerShown: true,
        }} 
      />
    </Stack>
  );
}