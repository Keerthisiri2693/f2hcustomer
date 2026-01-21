import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import VendorIllustration from "../../assets/images/vendor.svg";
import { router } from "expo-router";

/* 🌿 GREEN THEME */
const COLORS = {
  primary: "#2E7D32",       // Main Green
  primaryDark: "#1B5E20",
  background: "#E8F5E9",    // Light mint
  card: "#FFFFFF",
  inputBg: "#F1F8F4",
  textPrimary: "#1B5E20",
  textSecondary: "#4CAF50",
  muted: "#777",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* 🌿 HEADER */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <VendorIllustration width={110} height={110} />
        </View>

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to continue</Text>
      </View>

      {/* ⚪ LOGIN CARD */}
      <View style={styles.card}>
        {/* EMAIL */}
        <View style={styles.inputBox}>
          <MaterialCommunityIcons
            name="email-outline"
            size={22}
            color={COLORS.muted}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={COLORS.muted}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputBox}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={22}
            color={COLORS.muted}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={COLORS.muted}
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.forgot}
          onPress={() => router.push("/common/forgot1")}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => router.push("/common/dashboard2")}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/common/signup")}>
            <Text style={styles.signupLink}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  /* 🌿 HEADER */
  header: {
    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight ?? 24
        : 44,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  avatarCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 12,
    marginTop: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    marginTop: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#C8E6C9",
    marginTop: 4,
  },

  /* ⚪ CARD */
  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 24,
    elevation: 10,
    marginTop: -20,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
    height: 52,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  forgot: {
    alignSelf: "flex-end",
    marginBottom: 18,
  },

  forgotText: {
    color: COLORS.primary,
    fontSize: 13,
  },

  loginBtn: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  signupText: {
    color: COLORS.muted,
  },

  signupLink: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
