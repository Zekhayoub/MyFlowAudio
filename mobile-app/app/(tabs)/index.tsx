import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import SongCard from "../../components/ui/SongCard";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const mockSongs = [
  {
    id: "1",
    title: "SPIDER",
    author: "GIMS & DYSTINCT",
    image: require("../../assets/images/no_image_path.jpg"),
  },
  {
    id: "2",
    title: "POP!",
    author: "NAYEON",
    image: require("../../assets/images/no_image_path.jpg"),
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <ScrollView
      style={{ flex: 1, padding: 20, backgroundColor: theme.background0 }}
    >
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          color: theme.primary,
          marginBottom: 20,
        }}
      >
        Bienvenue
      </Text>

      {/* Liked Songs Button */}
      <Pressable
        onPress={() => router.push("/liked")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.button,
          borderRadius: 10,
          padding: 15,
          marginBottom: 30,
        }}
      >
        <Image
          source={require("../../assets/images/liked.png")}
          style={{ width: 50, height: 50, marginRight: 15, borderRadius: 6 }}
        />
        <Text style={{ color: theme.primary, fontSize: 18 }}>Liked Songs</Text>
      </Pressable>

      {/* Your Playlists */}
      <Text
        style={{
          color: theme.primary,
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 10,
        }}
      >
        Your Playlists
      </Text>

      <Pressable
        onPress={() => {
          console.log("Create new playlist");
        }}
        style={{
          backgroundColor: theme.button,
          padding: 15,
          borderRadius: 10,
          marginBottom: 30,
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.primary, fontSize: 16 }}>Nouvelle play</Text>
      </Pressable>

      {/* Newest Songs */}
      <Text
        style={{ color: theme.primary, fontSize: 22, marginBottom: 10 }}
      >
        Newest songs
      </Text>

      {mockSongs.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </ScrollView>
  );
}
