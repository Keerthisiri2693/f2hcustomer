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
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import VendorIllustration from "../../assets/images/vendor.svg";
import { router } from "expo-router";

/* 🌿 GREEN THEME */
const COLORS = {
  primary: "#2E7D32",
  primaryDark: "#1B5E20",
  background: "#E8F5E9",
  card: "#FFFFFF",
  inputBg: "#F1F8F4",
  textPrimary: "#1B5E20",
  textSecondary: "#4CAF50",
  muted: "#777",
};

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* 🌿 HEADER */}
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <VendorIllustration width={110} height={110} />
          </View>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Register to start using the app
          </Text>
        </View>

        {/* ⚪ SIGNUP CARD */}
        <View style={styles.card}>
          {/* NAME */}
          <View style={styles.inputBox}>
            <MaterialCommunityIcons
              name="account-outline"
              size={22}
              color={COLORS.muted}
            />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={COLORS.muted}
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

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

          {/* CONFIRM PASSWORD */}
          <View style={styles.inputBox}>
            <MaterialCommunityIcons
              name="lock-check-outline"
              size={22}
              color={COLORS.muted}
            />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={COLORS.muted}
              secureTextEntry
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {/* CREATE ACCOUNT BUTTON */}
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>

          {/* GO TO LOGIN */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/common/login1")}>
              <Text style={styles.signupLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

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

  card: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 24,
    elevation: 10,
    marginTop: -20,
    height: "100%",
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

  loginBtn: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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
    marginTop: 22,
  },

  signupText: {
    color: COLORS.muted,
  },

  signupLink: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
