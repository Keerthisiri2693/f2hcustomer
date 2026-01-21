import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
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

export default function AddPaymentMethodScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [type, setType] = useState("UPI");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const onSave = () => {
    alert("Payment method saved");
    router.back();
  };

  return (
    <View style={styles.root}>
      {/* STATUS BAR */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
      />

      {/* 🔥 SAFE AREA FILL (NO NOTCH GAP) */}
      <View style={[styles.statusFill, { height: insets.top }]} />

      {/* ❤️ TOOLBAR */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>
          Add Payment Method
        </Text>

        <TouchableOpacity onPress={onSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* ===== CONTENT ===== */}
      <View style={styles.content}>
        {/* PAYMENT TYPE */}
        <Text style={styles.sectionTitle}>Payment Type</Text>

        <View style={styles.typeRow}>
          {["UPI", "Card", "Wallet"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.typeChip,
                type === item && styles.typeChipActive,
              ]}
              onPress={() => setType(item)}
            >
              <Text
                style={[
                  styles.typeText,
                  type === item && styles.typeTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ===== UPI ===== */}
        {type === "UPI" && (
          <>
            <Text style={styles.label}>UPI ID</Text>
            <TextInput
              style={styles.input}
              placeholder="example@upi"
              placeholderTextColor={COLORS.textMuted}
              value={upiId}
              onChangeText={setUpiId}
            />
          </>
        )}

        {/* ===== CARD ===== */}
        {type === "Card" && (
          <>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="number-pad"
              value={cardNumber}
              onChangeText={setCardNumber}
            />

            <Text style={styles.label}>Card Holder Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Keerthana"
              placeholderTextColor={COLORS.textMuted}
              value={cardName}
              onChangeText={setCardName}
            />

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Expiry</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  placeholderTextColor={COLORS.textMuted}
                  value={expiry}
                  onChangeText={setExpiry}
                />
              </View>

              <View style={{ width: 16 }} />

              <View style={{ flex: 1 }}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="***"
                  placeholderTextColor={COLORS.textMuted}
                  keyboardType="number-pad"
                  secureTextEntry
                  value={cvv}
                  onChangeText={setCvv}
                />
              </View>
            </View>
          </>
        )}

        {/* ===== WALLET ===== */}
        {type === "Wallet" && (
          <>
            <Text style={styles.label}>Wallet Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Paytm / PhonePe / Amazon Pay"
              placeholderTextColor={COLORS.textMuted}
            />
          </>
        )}
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

  statusFill: {
    backgroundColor: COLORS.primary,
  },

  /* ===== TOOLBAR ===== */
  toolbar: {
    height: 56,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  toolbarTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
  },

  saveText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFF",
  },

  /* ===== CONTENT ===== */
  content: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: COLORS.textDark,
  },

  /* TYPE CHIPS */
  typeRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  typeChip: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 12,
    backgroundColor: COLORS.card,
  },

  typeChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  typeText: {
    color: COLORS.textMuted,
    fontWeight: "600",
  },

  typeTextActive: {
    color: "#FFFFFF",
  },

  /* FORM */
  label: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 6,
    marginTop: 14,
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

  row: {
    flexDirection: "row",
    marginTop: 4,
  },
});
