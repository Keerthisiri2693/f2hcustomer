import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

/* ❤️ VALENTINE THEME */
const COLORS = {
  primary: "#E53935",
  accent: "#EC407A",
  background: "#FFF1F2",
  card: "#FFFFFF",
  border: "#F8BBD0",
  textPrimary: "#7F1D1D",
  textSecondary: "#9F1239",
};

export default function OrderSuccessPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <View style={styles.container}>
        {/* ❤️ SUCCESS ICON */}
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons
            name="check-circle"
            size={90}
            color={COLORS.primary}
          />
        </View>

        {/* 🎉 TEXT */}
        <Text style={styles.title}>Order Placed Successfully!</Text>
        <Text style={styles.subtitle}>
          Your delicious food is on the way 💖
        </Text>

        {/* 📦 INFO CARD */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Order ID</Text>
            <Text style={styles.value}>ORD123</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Estimated Delivery</Text>
            <Text style={styles.value}>25–30 mins</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Payment</Text>
            <Text style={styles.value}>Cash on Delivery</Text>
          </View>
        </View>

        {/* ❤️ ACTION BUTTONS */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.replace("/order/order")}
        >
          <Text style={styles.primaryText}>View Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.secondaryText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const STATUSBAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },

  iconWrap: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 2,
    borderColor: COLORS.border,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },

  card: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  value: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  primaryBtn: {
    width: "100%",
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  primaryText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  secondaryBtn: {
    width: "100%",
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
  },
});
