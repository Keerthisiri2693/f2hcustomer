import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/* ❤️ VALENTINE THEME */
const COLORS = {
  primary: "#E53935",
  accent: "#EC407A",
  background: "#FFF1F2",
  card: "#FFFFFF",
  border: "#F8BBD0",
  textDark: "#7F1D1D",
  textMuted: "#9F1239",
};

export default function EditProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState("Keerthana");
  const [phone, setPhone] = useState("+91 9XXXX XXXXX");
  const [email, setEmail] = useState("keerthana@gmail.com");

  return (
    <View style={styles.root}>
      {/* ✅ PAINT NOTCH AREA */}
      <View
        style={[
          styles.notch,
          { height: insets.top },
        ]}
      />

      {/* ✅ STATUS BAR */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.card}
      />

      {/* ✅ TOOLBAR (FIXED HEIGHT) */}
      <View style={styles.toolbar}>
        {/* BACK */}
        <TouchableOpacity
          style={styles.toolbarSide}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={"#FFFFFF"}
          />
        </TouchableOpacity>

        {/* TITLE */}
        <Text style={styles.toolbarTitle}>Edit Profile</Text>

        {/* SAVE */}
        <TouchableOpacity
          style={styles.toolbarSide}
          onPress={() => alert("Profile Saved")}
        >
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* ===== CONTENT ===== */}
      <View style={styles.content}>
        {/* PROFILE IMAGE */}
        <View style={styles.imageWrapper}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              style={styles.avatar}
            />

            <TouchableOpacity style={styles.cameraBtn}>
              <MaterialCommunityIcons
                name="camera"
                size={18}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* FORM */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter full name"
          placeholderTextColor={COLORS.textMuted}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="Enter phone number"
          placeholderTextColor={COLORS.textMuted}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter email"
          placeholderTextColor={COLORS.textMuted}
        />
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* 🔥 NOTCH PAINT */
  notch: {
    backgroundColor: COLORS.primary,
  },

  /* ===== TOOLBAR ===== */
  toolbar: {
    height: 56,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  toolbarSide: {
    width: 56,
    alignItems: "center",
    justifyContent: "center",
  },

  toolbarTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFF",
  },

  saveText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFF",
  },

  /* ===== CONTENT ===== */
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },

  imageWrapper: {
    alignItems: "center",
    marginBottom: 28,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: COLORS.border,
  },

  cameraBtn: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 20,
    elevation: 3,
  },

  label: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 6,
    marginTop: 16,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: COLORS.card,
    fontSize: 15,
    color: COLORS.textDark,
  },
});
