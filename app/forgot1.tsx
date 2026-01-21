import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
  StatusBar,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { router } from "expo-router";

/* ❤️ VALENTINE THEME */
const V = {
  PRIMARY: "#E53935",
  ACCENT: "#EC407A",
  BG: "#FFF1F2",
  CARD: "#FFFFFF",
  BORDER: "#F8BBD0",
  TEXT_DARK: "#7F1D1D",
  TEXT_MUTED: "#9F1239",
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    try {
      setLoading(true);

      // 🔹 Call API / Firebase reset here
      // await sendResetEmail(email);

      Alert.alert(
        "Success",
        "Password reset link has been sent to your email ❤️"
      );
      router.back();
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={V.PRIMARY} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* ❤️ SHAPE HEADER */}
        <View style={styles.shapeHeader}>
          <View style={styles.circleBig} />
          <View style={styles.circleSmall} />

          <Text style={styles.headerTitle}>Forgot Password</Text>
          <Text style={styles.headerSubtitle}>
            Reset your password securely ❤️
          </Text>
        </View>

        {/* 🧾 FORM CARD */}
        <View style={styles.formCard}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your registered email address
          </Text>

          {/* EMAIL INPUT */}
          <TextInput
            label="Email address"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            outlineColor={V.BORDER}
            activeOutlineColor={V.PRIMARY}
            left={
              <TextInput.Icon
                icon="email-outline"
                color={V.PRIMARY}
              />
            }
          />

          {/* RESET BUTTON */}
          <Button
            mode="contained"
            loading={loading}
            disabled={loading}
            onPress={handleReset}
            style={styles.resetButton}
            labelStyle={styles.resetButtonText}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>

          {/* BACK TO LOGIN */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>
              Remember your password?
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.loginLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: V.BG,
  },

  container: {
    flex: 1,
  },

  /* ❤️ HEADER SHAPE */
  shapeHeader: {
    height: 260,
    backgroundColor: V.PRIMARY,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 24,
    justifyContent: "center",
    overflow: "hidden",
  },

  circleBig: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(255,255,255,0.12)",
    top: -90,
    right: -90,
  },

  circleSmall: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255,255,255,0.16)",
    bottom: -45,
    left: -45,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.95)",
    marginTop: 6,
  },

  /* 🧾 FORM CARD */
  formCard: {
    flex: 1,
    backgroundColor: V.CARD,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 26,
    elevation: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: V.TEXT_DARK,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: V.TEXT_MUTED,
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    marginBottom: 16,
    backgroundColor: V.CARD,
  },

  resetButton: {
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    backgroundColor: V.PRIMARY,
    marginTop: 6,
  },

  resetButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 22,
  },

  loginText: {
    fontSize: 14,
    color: V.TEXT_MUTED,
  },

  loginLink: {
    fontSize: 14,
    fontWeight: "700",
    color: V.ACCENT,
  },
});
