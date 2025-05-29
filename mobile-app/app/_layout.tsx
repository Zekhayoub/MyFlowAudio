import { useState, useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { AudioProvider } from '../src/contexts/AudioContext';
import { AuthProvider, useAuth } from '../src/providers/AuthProvider';
import AudioPlayerBar from '../src/components/audio/AudioPlayerBar';
import theme from '../src/styles/theme';

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const { user, isLoading } = useAuth();
  
  useEffect(() => {
    if (isLoading) return;
    
    const inAuthGroup = segments[0] === '(auth)';
    
    if (!user && !inAuthGroup) {
      // Rediriger vers login si non authentifié
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // Rediriger vers l'app si déjà authentifié
      router.replace('/(drawer)/');
    }
  }, [user, segments, isLoading]);
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.gradient1} />
      </View>
    );
  }
  
  const inAuthGroup = segments[0] === '(auth)';
  
  return (
    <>
      <StatusBar style="light" backgroundColor="#1E40AF" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
      
      {/* Lecteur audio seulement si pas sur les pages auth */}
      {!inAuthGroup && <AudioPlayerBar />}
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AudioProvider>
        <RootLayoutNav />
      </AudioProvider>
    </AuthProvider>
  );
}