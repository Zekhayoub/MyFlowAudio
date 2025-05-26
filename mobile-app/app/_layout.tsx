import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AudioProvider } from '../src/contexts/AudioContext';
import AudioPlayerBar from '../src/components/audio/AudioPlayerBar';

export default function RootLayout() {
  return (
    <AudioProvider>
      <StatusBar style="light" backgroundColor="#1E40AF" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
      
      {/* Lecteur audio fixe en bas de toutes les pages */}
      <AudioPlayerBar />
    </AudioProvider>
  );
}