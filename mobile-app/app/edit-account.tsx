import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function EditAccountScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const [username, setUsername] = useState("nnnn99");

  const handleSave = () => {
    console.log("New username:", username);
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background0 }]}>
      <View style={styles.topBar}>
        <Text style={[styles.title, { color: theme.primary }]}>Account Edit</Text>
        <Pressable
          style={[styles.logoutButton, { backgroundColor: theme.primary }]}
          onPress={() => router.back()}
        >
          <Text style={[styles.logoutText, { color: theme.tertiary }]}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Image
          source={require("../assets/images/no_avatar_path.png")}
          style={styles.avatar}
        />
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your name"
          placeholderTextColor={theme.secondary}
          style={[
            styles.input,
            {
              color: theme.primary,
              backgroundColor: theme.button,
              borderColor: theme.slider,
            },
          ]}
        />
        <Pressable
          onPress={handleSave}
          style={[styles.button, { backgroundColor: theme.tint }]}
        >
          <Text style={styles.buttonText}>Sauvegarder</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topBar: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
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
  content: {
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: "80%",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
