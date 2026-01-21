import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";
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

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  /* 🔐 CUSTOMER LOGIN HANDLER */
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Firebase Auth login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

      // 2️⃣ Check role from Realtime Database
      const customerRef = ref(db, `users/customers/${user.uid}`);
      const snapshot = await get(customerRef);

      if (!snapshot.exists()) {
        // ❌ Not a customer
        Alert.alert(
          "Access denied",
          "This account is not registered as a customer"
        );
        await auth.signOut();
        setLoading(false);
        return;
      }

      // ✅ Customer verified
      console.log("Customer logged in:", user.uid);

      router.replace("/dashboard");
    } catch (error: any) {
      let message = "Login failed";

      if (error.code === "auth/user-not-found") {
        message = "No account found with this email";
      } else if (error.code === "auth/wrong-password") {
        message = "Incorrect password";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address";
      }

      Alert.alert("Login Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        {/* ❤️ SHAPE HEADER */}
        <View style={styles.shapeContainer}>
          <View style={styles.circleBig} />
          <View style={styles.circleSmall} />

          <Text style={styles.appTitle}>F2H App</Text>
          <Text style={styles.appSubtitle}>
            Fresh food delivered with love ❤️
          </Text>
        </View>

        {/* 🧾 FORM CARD */}
        <View style={styles.formCard}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to continue</Text>

          {/* EMAIL */}
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

          {/* PASSWORD */}
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry={secure}
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
                icon={secure ? "eye-off-outline" : "eye-outline"}
                onPress={() => setSecure(!secure)}
              />
            }
          />

          {/* FORGOT */}
          <TouchableOpacity
            style={styles.forgot}
            onPress={() => router.push("/forgot1")}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* LOGIN BUTTON */}
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}
            labelStyle={styles.loginText}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              "Login"
            )}
          </Button>

          {/* SIGNUP */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don’t have an account?</Text>
            <TouchableOpacity
              onPress={() => router.push("/signup")}
            >
              <Text style={styles.signupLink}> Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* 🎨 STYLES */
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

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: V.TEXT_DARK,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: V.TEXT_MUTED,
    textAlign: "center",
    marginBottom: 22,
  },

  input: {
    marginBottom: 14,
    backgroundColor: V.CARD,
  },

  forgot: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },

  forgotText: {
    fontSize: 13,
    color: V.PRIMARY,
    fontWeight: "600",
  },

  loginButton: {
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    backgroundColor: V.PRIMARY,
  },

  loginText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 22,
  },

  signupText: {
    fontSize: 14,
    color: V.TEXT_MUTED,
  },

  signupLink: {
    fontSize: 14,
    fontWeight: "700",
    color: V.ACCENT,
  },
});
