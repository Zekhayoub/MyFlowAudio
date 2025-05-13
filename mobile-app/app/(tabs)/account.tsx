import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function AccountScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const username = "nnnn99"; // valeur temporaire

  return (
    <View style={[styles.container, { backgroundColor: theme.background0 }]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={[styles.title, { color: theme.primary }]}>
          Account Settings
        </Text>
        <Pressable
          style={[styles.logoutButton, { backgroundColor: theme.primary }]}
          onPress={() => console.log("Logout pressed")}
        >
          <Text style={[styles.logoutText, { color: theme.tertiary }]}>
            Logout
          </Text>
        </Pressable>
      </View>

      {/* Avatar + Username */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarWrapper}>
          <Image
            source={require("../../assets/images/no_avatar_path.png")}
            style={styles.avatar}
          />
          <Pressable
            style={[styles.editIcon, { backgroundColor: theme.slider }]}
            onPress={() => router.push("/edit-account")}
          >
            <Text style={{ color: theme.primary, fontSize: 16 }}>✏️</Text>
          </Pressable>
        </View>
        <Text style={[styles.username, { color: theme.primary }]}>
          {username}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  topBar: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  logoutButton: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  logoutText: {
    fontWeight: "bold",
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 20,
    padding: 6,
  },
  username: {
    fontSize: 18,
    marginTop: 10,
  },
});
