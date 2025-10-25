import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import ProfileHeader from "@/components/SettingHeader"

export default function SettingsProfileScreen() {
  const router=useRouter();
  const [name, setName] = useState("Romina");
  const [email, setEmail] = useState("gmail@example.com");
  const [password, setPassword] = useState("password123");

  return (
    <View style={styles.container}>
      <ProfileHeader title="Settings" subtitle="Profile" showBack  onBackPress={()=>router.back()} />
      {/* Header */}
      {/* <Text style={styles.header}>Settings</Text>
      <Text style={styles.subHeader}>Your Profile</Text> */}

      {/* Profile Image with Edit Button */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editBtn}>
          <Ionicons name="pencil" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
        secureTextEntry
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 50
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subHeader: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  imageContainer: {
    alignSelf: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ff6600",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#f2f5ff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 16,
    color: "#333",
  },
  saveBtn: {
    marginTop: 220,
    backgroundColor: "#ff6600",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
