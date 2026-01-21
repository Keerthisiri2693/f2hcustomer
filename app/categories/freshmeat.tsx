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

/* ================= COLORS ================= */

const COLORS = {
  woodBrown: "#6D4C41",
  woodBrownDark: "#4E342E",
  woodBrownLight: "#A1887F",

  green: "#2E7D32",
  red: "#D32F2F",

  background: "#FFF1F2",
  surface: "#FFF7F9",
  border: "#FADADD",

  textPrimary: "#3E2723",
  textSecondary: "#795548",
};

/* ---------------- SHOP DATA ---------------- */

const SHOPS = [
  {
    id: "1",
    name: "Fresh Chicken",
    location: "Velachery, Chennai",
    rating: 4.4,
    distance: "2.1 km",
    deliveryTime: "30–35 mins",
    openTime: "06:00",
    closeTime: "23:00",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
  },
  {
    id: "2",
    name: "Meat Master",
    location: "T Nagar, Chennai",
    rating: 4.3,
    distance: "5.1 km",
    deliveryTime: "35–40 mins",
    openTime: "07:00",
    closeTime: "23:00",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
  },
];

/* ---------------- TIME CHECK ---------------- */

const isShopOpenNow = (openTime: string, closeTime: string) => {
  const now = new Date();
  const [oH, oM] = openTime.split(":").map(Number);
  const [cH, cM] = closeTime.split(":").map(Number);

  const open = new Date();
  open.setHours(oH, oM, 0, 0);

  const close = new Date();
  close.setHours(cH, cM, 0, 0);

  if (close < open) return now >= open || now <= close;
  return now >= open && now <= close;
};

/* ================= SCREEN ================= */

export default function FreshMeat() {
  const router = useRouter();
  const { themeColor } = useLocalSearchParams<{ themeColor?: string }>();

  const THEME = themeColor || COLORS.woodBrown;
  const [search, setSearch] = useState("");

  const filteredShops = SHOPS.filter((shop) =>
    shop.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={THEME} />

      {/* 🟤 TOOLBAR */}
      <View style={[styles.toolbar, { backgroundColor: THEME }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>Fresh Meat</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* 🔍 SEARCH */}
      <View style={styles.searchBox}>
        <MaterialCommunityIcons
          name="magnify"
          size={22}
          color={COLORS.textSecondary}
        />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search meat shops..."
          placeholderTextColor={COLORS.textSecondary}
          style={styles.searchInput}
        />
      </View>

      {/* 🏪 SHOP LIST */}
      <FlatList
        data={filteredShops}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isOpenNow = isShopOpenNow(item.openTime, item.closeTime);

          return (
            <TouchableOpacity
              disabled={!isOpenNow}
              style={[
                styles.shopCard,
                { opacity: isOpenNow ? 1 : 0.45 },
              ]}
              onPress={() =>
                router.push({
                  pathname: "/productlist/freshmeatproductlist",
                  params: { shopId: item.id },
                })
              }
            >
              <Image source={{ uri: item.image }} style={styles.shopImage} />

              <View style={styles.shopInfo}>
                <Text style={styles.shopName}>{item.name}</Text>
                <Text style={styles.shopLocation}>{item.location}</Text>

                <View style={styles.metaRow}>
                  <MaterialCommunityIcons
                    name="star"
                    size={14}
                    color={COLORS.woodBrownLight}
                  />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                  <Text style={styles.metaText}> • {item.distance}</Text>
                  <Text style={styles.metaText}>
                    {" "}• {item.deliveryTime}
                  </Text>
                </View>

                <View style={styles.openRow}>
                  <View
                    style={[
                      styles.statusDot,
                      {
                        backgroundColor: isOpenNow
                          ? COLORS.green
                          : COLORS.red,
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.openText,
                      {
                        color: isOpenNow
                          ? COLORS.green
                          : COLORS.red,
                      },
                    ]}
                  >
                    {isOpenNow
                      ? "Open now"
                      : `Opens at ${item.openTime}`}
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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },

  toolbar: {
    height:
      Platform.OS === "android"
        ? 56 + (StatusBar.currentHeight || 0)
        : 56,
    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight || 0
        : 0,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  toolbarTitle: { fontSize: 18, fontWeight: "700", color: "#fff" },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    margin: 16,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  searchInput: { flex: 1, marginLeft: 8 },

  listContent: { paddingHorizontal: 16, paddingBottom: 90 },

  shopCard: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },

  shopImage: { width: 90, height: 90 },

  shopInfo: { flex: 1, padding: 12 },

  shopName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  shopLocation: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  metaRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },

  ratingText: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  metaText: { fontSize: 12, color: COLORS.textSecondary },

  openRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },

  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },

  openText: { fontSize: 12, fontWeight: "600" },
});
