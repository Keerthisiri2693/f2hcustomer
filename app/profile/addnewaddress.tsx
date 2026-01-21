import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
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

export default function AddNewAddressScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [type, setType] = useState("Home");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

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
          Add New Address
        </Text>

        <TouchableOpacity onPress={() => alert("Address Saved")}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* ===== CONTENT ===== */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ADDRESS TYPE */}
        <Text style={styles.sectionTitle}>Address Type</Text>

        <View style={styles.typeRow}>
          {["Home", "Work", "Other"].map((item) => (
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

        <Text style={styles.label}>Full Address</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={address}
          onChangeText={setAddress}
          multiline
          placeholder="House no, street, area"
          placeholderTextColor={COLORS.textMuted}
        />

        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          value={state}
          onChangeText={setState}
          placeholder="Enter state"
          placeholderTextColor={COLORS.textMuted}
        />

        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Enter city"
          placeholderTextColor={COLORS.textMuted}
        />

        <Text style={styles.label}>Pincode</Text>
        <TextInput
          style={styles.input}
          value={pincode}
          onChangeText={setPincode}
          keyboardType="number-pad"
          placeholder="Enter pincode"
          placeholderTextColor={COLORS.textMuted}
        />
      </ScrollView>
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
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: COLORS.textDark,
  },

  /* ADDRESS TYPE */
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

  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
});
