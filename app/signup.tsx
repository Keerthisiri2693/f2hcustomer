import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../../F2H/app/firebase/firebaseConfig"; // ✅ FIXED PATH

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

export default function CreateAccountScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [securePass, setSecurePass] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [loading, setLoading] = useState(false);

  /* 🔐 CREATE CUSTOMER ACCOUNT */
  const handleCreateAccount = async () => {
    if (!name || !email || !password || !confirm) {
      Alert.alert("Missing fields", "Please fill all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Weak password",
        "Password must be at least 6 characters"
      );
      return;
    }

    if (password !== confirm) {
      Alert.alert("Password mismatch", "Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

      // 2️⃣ Update display name
      await updateProfile(user, {
        displayName: name,
      });

      // 3️⃣ Save customer profile in Realtime Database
      await set(ref(db, `users/customers/${user.uid}`), {
        uid: user.uid,
        name,
        email,
        role: "customer",
        createdAt: Date.now(),
      });

      Alert.alert("Success", "Account created successfully 🎉");

      // 4️⃣ Navigate to dashboard
      router.replace("/dashboard");
    } catch (error: any) {
      let message = "Signup failed";

      if (error.code === "auth/email-already-in-use") {
        message = "Email already registered";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address";
      } else if (error.code === "auth/weak-password") {
        message = "Password too weak";
      }

      Alert.alert("Signup Error", message);
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
        <View style={styles.shapeContainer}>
          <View style={styles.circleBig} />
          <View style={styles.circleSmall} />

          <Text style={styles.appTitle}>Create Account</Text>
          <Text style={styles.appSubtitle}>
            Join us & start ordering delicious food ❤️
          </Text>
        </View>

        {/* 🧾 FORM CARD */}
        <View style={styles.formCard}>
          {/* NAME */}
          <TextInput
            label="Full name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
            outlineColor={V.BORDER}
            activeOutlineColor={V.PRIMARY}
            left={
              <TextInput.Icon
                icon="account-outline"
                color={V.PRIMARY}
              />
            }
          />

          {/* EMAIL */}
          <TextInput
            label="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            mode="outlined"
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

          {/* PASSWORD */}
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={securePass}
            mode="outlined"
            style={styles.input}
            outlineColor={V.BORDER}
            activeOutlineColor={V.PRIMARY}
            left={
              <TextInput.Icon
                icon="lock-outline"
                color={V.PRIMARY}
              />
            }
            right={
              <TextInput.Icon
                icon={securePass ? "eye-off-outline" : "eye-outline"}
                onPress={() => setSecurePass(!securePass)}
              />
            }
          />

          {/* CONFIRM PASSWORD */}
          <TextInput
            label="Confirm password"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry={secureConfirm}
            mode="outlined"
            style={styles.input}
            outlineColor={V.BORDER}
            activeOutlineColor={V.PRIMARY}
            left={
              <TextInput.Icon
                icon="lock-check-outline"
                color={V.PRIMARY}
              />
            }
            right={
              <TextInput.Icon
                icon={
                  secureConfirm ? "eye-off-outline" : "eye-outline"
                }
                onPress={() =>
                  setSecureConfirm(!secureConfirm)
                }
              />
            }
          />

          {/* CREATE BUTTON */}
          <Button
            mode="contained"
            onPress={handleCreateAccount}
            style={styles.createButton}
            labelStyle={styles.createText}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              "Create Account"
            )}
          </Button>

          {/* LOGIN LINK */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => router.replace("/login")}
            >
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

  shapeContainer: {
    height: 260,
    backgroundColor: V.PRIMARY,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    justifyContent: "center",
    paddingHorizontal: 24,
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

  appTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  appSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.95)",
    marginTop: 6,
  },

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

  input: {
    marginBottom: 14,
    backgroundColor: V.CARD,
  },

  createButton: {
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    backgroundColor: V.PRIMARY,
    marginTop: 10,
  },

  createText: {
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
