import { View, Text, StyleSheet, Image } from "react-native";

interface SongCardProps {
  song: {
    id: string;
    title: string;
    author: string;
    image: any; // image locale via require()
  };
}

export default function SongCard({ song }: SongCardProps) {
  return (
    <View style={styles.card}>
      <Image source={song.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.author}>By {song.author}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  author: {
    color: "#aaa",
    fontSize: 14,
  },
});
