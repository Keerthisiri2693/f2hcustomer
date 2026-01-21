import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

/* ================= VALENTINE THEMES ================= */

const THEMES = {
  MIXED: {
    primary: "#E11D48",
    accent: "#FB7185",
    background: "#FFF1F2",
    border: "#FBCFE8",
    textPrimary: "#7F1D1D",
    textSecondary: "#9F1239",
  },
} as const;

type ThemeKey = keyof typeof THEMES;

const COLORS = {
  veg: "#2E7D32",
  nonveg: "#C62828",
  open: "#2E7D32",
  closed: "#D32F2F",
  card: "#FFFFFF",
};

/* ---------------- SHOP DATA ---------------- */

const SHOPS = [
  {
    id: "1",
    name: "Hotel Annapoorna",
    location: "Velachery, Chennai",
    rating: 4.4,
    openTime: "07:00",
    closeTime: "23:00",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  },
  {
    id: "2",
    name: "SS Hyderabad Biryani",
    location: "T Nagar",
    rating: 4.5,
    openTime: "11:00",
    closeTime: "23:00",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },
];

/* ---------------- OPEN / CLOSE LOGIC ---------------- */

const isShopOpenNow = (openTime: string, closeTime: string) => {
  const [oH, oM] = openTime.split(":").map(Number);
  const [cH, cM] = closeTime.split(":").map(Number);
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const openMin = oH * 60 + oM;
  const closeMin = cH * 60 + cM;

  return closeMin < openMin
    ? nowMin >= openMin || nowMin <= closeMin
    : nowMin >= openMin && nowMin <= closeMin;
};

/* ================= SCREEN ================= */

export default function VegNonVeg() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string | string[] }>();

  /* ✅ SAFE CATEGORY NORMALIZATION */
  const rawCategory = Array.isArray(params.category)
    ? params.category[0]
    : params.category;

  const category: ThemeKey =
    rawCategory && rawCategory in THEMES ? (rawCategory as ThemeKey) : "MIXED";

  const THEME = THEMES[category];

  const [search, setSearch] = useState("");

  const filteredShops = SHOPS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: THEME.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={THEME.primary} />

      {/* ❤️ TOOLBAR */}
      <View style={[styles.toolbar, { backgroundColor: THEME.primary }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>Veg & Non-Veg</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* 🔍 SEARCH */}
      <View style={[styles.searchBox, { borderColor: THEME.border }]}>
        <MaterialCommunityIcons
          name="magnify"
          size={22}
          color={THEME.textSecondary}
        />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search restaurants..."
          placeholderTextColor={THEME.textSecondary}
          style={[styles.searchInput, { color: THEME.textPrimary }]}
        />
      </View>

      {/* 🏪 SHOP LIST */}
      <FlatList
        data={filteredShops}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isOpen = isShopOpenNow(item.openTime, item.closeTime);

          return (
            <TouchableOpacity
              activeOpacity={0.85}
              disabled={!isOpen}
              style={[
                styles.shopCard,
                { opacity: isOpen ? 1 : 0.45, shadowColor: THEME.primary },
              ]}
              onPress={() =>
                router.push({
                  pathname: "/productlist/vegnonvegproductlist",
                  params: {
                    shopId: item.id,
                    shopName: item.name,
                    shopImage: item.image,
                    category: "MIXED",
                  },
                })
              }
            >
              <Image source={{ uri: item.image }} style={styles.shopImage} />

              <View style={styles.shopInfo}>
                <View style={styles.badgeRow}>
                  <Text style={[styles.vegBadge, { color: COLORS.veg }]}>
                    ● Veg
                  </Text>
                  <Text style={[styles.nonVegBadge, { color: COLORS.nonveg }]}>
                    ● Non-Veg
                  </Text>
                </View>

                <Text style={[styles.shopName, { color: THEME.textPrimary }]}>
                  {item.name}
                </Text>
                <Text
                  style={[styles.shopLocation, { color: THEME.textSecondary }]}
                >
                  {item.location}
                </Text>

                <View style={styles.ratingRow}>
                  <MaterialCommunityIcons
                    name="heart"
                    size={14}
                    color={THEME.accent}
                  />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>

                <View style={styles.openRow}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: isOpen ? COLORS.open : COLORS.closed },
                    ]}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: isOpen ? COLORS.open : COLORS.closed,
                    }}
                  >
                    {isOpen ? "Open now" : `Opens at ${item.openTime}`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const STATUSBAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

const styles = StyleSheet.create({
  safe: { flex: 1 },

  toolbar: {
    height: 56 + STATUSBAR_HEIGHT,
    paddingTop: STATUSBAR_HEIGHT,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  toolbarTitle: { fontSize: 18, fontWeight: "700", color: "#fff" },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
  },

  searchInput: { flex: 1, marginLeft: 8 },

  listContent: { paddingHorizontal: 16, paddingBottom: 90 },

  shopCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 14,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
    overflow: "hidden",
  },

  shopImage: { width: 90, height: 90 },

  shopInfo: { flex: 1, padding: 12 },

  badgeRow: { flexDirection: "row", marginBottom: 4 },

  vegBadge: { fontSize: 12, fontWeight: "700", marginRight: 10 },

  nonVegBadge: { fontSize: 12, fontWeight: "700" },

  shopName: { fontSize: 16, fontWeight: "700" },

  shopLocation: { fontSize: 13 },

  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },

  ratingText: { marginLeft: 4, fontSize: 13, fontWeight: "600" },

  openRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },

  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
});
