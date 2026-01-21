import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
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
  danger: "#D32F2F",
};

/* ---------------- MOCK DATA ---------------- */

const ADDRESSES = [
  {
    id: "1",
    title: "Home",
    address: "12, Anna Nagar East, Chennai - 600102",
  },
  {
    id: "2",
    title: "Office",
    address: "DLF IT Park, Porur, Chennai - 600089",
  },
];

export default function AddressScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");

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

        <Text style={styles.toolbarTitle}>My Addresses</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* ===== CONTENT ===== */}
      <View style={styles.content}>
        {/* ADD NEW ADDRESS */}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() =>
            router.push("/profile/addnewaddress")
          }
        >
          <Text style={styles.addText}>
            Add New Address
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={22}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        {/* SECTION TITLE */}
        <Text style={styles.sectionTitle}>
          Saved Addresses
        </Text>

        {/* SEARCH BAR */}
        <View style={styles.searchBox}>
          <MaterialCommunityIcons
            name="magnify"
            size={20}
            color={COLORS.textMuted}
          />
          <TextInput
            placeholder="Search address"
            placeholderTextColor={COLORS.textMuted}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* ADDRESS LIST */}
        <FlatList
          data={ADDRESSES.filter(
            (a) =>
              a.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              a.address
                .toLowerCase()
                .includes(search.toLowerCase())
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <View style={styles.addressCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.addressTitle}>
                  {item.title}
                </Text>
                <Text style={styles.addressText}>
                  {item.address}
                </Text>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={{ marginLeft: 16 }}>
                  <MaterialCommunityIcons
                    name="delete-outline"
                    size={20}
                    color={COLORS.danger}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
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

  /* ===== CONTENT ===== */
  content: {
    padding: 16,
  },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.card,
    marginBottom: 20,
  },

  addText: {
    fontWeight: "700",
    color: COLORS.primary,
    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 12,
  },

  /* SEARCH */
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 8,
    fontSize: 15,
    color: COLORS.textDark,
  },

  /* ADDRESS CARD */
  addressCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  addressTitle: {
    fontWeight: "700",
    fontSize: 15,
    color: COLORS.textDark,
    marginBottom: 4,
  },

  addressText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
});
