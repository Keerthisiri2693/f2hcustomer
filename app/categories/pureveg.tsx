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
import BottomNav from "../../components/BottomNav";
import { useRouter } from "expo-router";

/* ================= PURE VEG THEME ================= */
const COLORS = {
  primary: "#2E7D32",
  primaryDark: "#1B5E20",
  background: "#F1F8F4",
  card: "#FFFFFF",
  border: "#C8E6C9",

  veg: "#2E7D32",
  open: "#2E7D32",
  closed: "#D32F2F",

  textPrimary: "#1B1B1B",
  textSecondary: "#4E6E58",
};

/* ---------------- PURE VEG SHOP DATA ---------------- */
const SHOPS = [
  {
    id: "1",
    name: "Green Leaf Veg Restaurant",
    location: "Anna Nagar",
    rating: 4.6,
    openTime: "07:00",
    closeTime: "22:30",
    image: "https://images.unsplash.com/photo-1546069901-eacef0df6022",
  },
  {
    id: "2",
    name: "Sangeetha Veg Restaurant",
    location: "T Nagar",
    rating: 4.5,
    openTime: "06:30",
    closeTime: "14:00",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
  },
  {
    id: "3",
    name: "A2B – Adyar Ananda Bhavan",
    location: "Velachery",
    rating: 4.4,
    openTime: "06:00",
    closeTime: "12:00",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  },
  {
    id: "4",
    name: "Saravana Bhavan",
    location: "Guindy",
    rating: 4.3,
    openTime: "15:00",
    closeTime: "21:30",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
  },
];

/* --------- AUTO OPEN / CLOSE LOGIC --------- */
const isShopOpenNow = (openTime: string, closeTime: string) => {
  if (!openTime || !closeTime) return false;

  const now = new Date();
  const [oH, oM] = openTime.split(":").map(Number);
  const [cH, cM] = closeTime.split(":").map(Number);

  if (isNaN(oH) || isNaN(cH)) return false;

  const open = new Date(now);
  open.setHours(oH, oM, 0, 0);

  const close = new Date(now);
  close.setHours(cH, cM, 0, 0);

  if (close < open) {
    return now >= open || now <= close;
  }

  return now >= open && now <= close;
};

export default function PureVeg() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredShops = SHOPS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* TOOLBAR */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>Pure Veg</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <MaterialCommunityIcons name="magnify" size={22} color="#9E9E9E" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search veg restaurants..."
          placeholderTextColor="#9E9E9E"
          style={styles.searchInput}
        />
      </View>

      {/* SHOP LIST */}
      <FlatList
        data={filteredShops}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isOpenNow = isShopOpenNow(item.openTime, item.closeTime);

          return (
            <TouchableOpacity
              disabled={!isOpenNow}
              activeOpacity={0.85}
              style={[
                styles.shopCard,
                { opacity: isOpenNow ? 1 : 0.45 },
              ]}
              onPress={() =>
                isOpenNow &&
                router.push({
                  pathname: "/productlist/purevegproductlist",
                  params: {
                    shopId: item.id,
                    shopName: item.name,
                    shopImage: item.image,
                    rating: item.rating,
                    openTime: item.openTime,
                    closeTime: item.closeTime,
                    theme: "PURE_VEG",
                  },
                })
              }
            >
              <Image source={{ uri: item.image }} style={styles.shopImage} />

              <View style={styles.shopInfo}>
                {/* PURE VEG BADGE */}
                <View style={styles.vegRow}>
                  <View style={styles.vegDot} />
                  <Text style={styles.vegText}>Pure Veg</Text>
                </View>

                <Text style={styles.shopName}>{item.name}</Text>
                <Text style={styles.shopLocation}>{item.location}</Text>

                {/* RATING */}
                <View style={styles.ratingRow}>
                  <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>

                {/* OPEN / CLOSED */}
                <View style={styles.openRow}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: isOpenNow ? COLORS.open : COLORS.closed },
                    ]}
                  />
                  <Text
                    style={[
                      styles.openText,
                      { color: isOpenNow ? COLORS.open : COLORS.closed },
                    ]}
                  >
                    {isOpenNow ? "Open now" : `Opens at ${item.openTime}`}
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
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  toolbar: {
    height: 56 + STATUSBAR_HEIGHT,
    paddingTop: STATUSBAR_HEIGHT,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
  },

  toolbarTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    margin: 16,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },

  shopCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    overflow: "hidden",
  },

  shopImage: {
    width: 90,
    height: 90,
  },

  shopInfo: {
    flex: 1,
    padding: 12,
  },

  vegRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },

  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.veg,
    marginRight: 6,
  },

  vegText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.veg,
  },

  shopName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  shopLocation: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  ratingText: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "600",
  },

  openRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  openText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
