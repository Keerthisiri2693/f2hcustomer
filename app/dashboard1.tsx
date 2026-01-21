import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  StatusBar,
  Platform,
  FlatList,
  Animated,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import BottomNav from "../components/BottomNav";

const { width, height } = Dimensions.get("window");

/* ================= VALENTINE THEME ================= */

export const V = {
  PRIMARY: "#E11D48",
  BG: "#FFF1F2",
  CARD: "#FFFFFF",
  ACCENT: "#FB7185",
  BORDER: "#FBCFE8",
  TEXT_DARK: "#7F1D1D",
  TEXT_SOFT: "#9F1239",
  SUCCESS: "#15803D",
};

export const CATEGORY_THEME = {
  MEAT: "#6D4C41",   // 🌳 Wood Brown
  VEG: "#2E7D32",    // 🌿 Green
  BOTH: "#9F1239",   // ❤️ Valentine Red
  INSTA: "#FB7185",  // 💗 Pink
};

/* ================= CATEGORY ROUTES ================= */

const CATEGORY_ROUTE_MAP: Record<
  "MEAT" | "VEG" | "BOTH" | "INSTA",
  string
> = {
  MEAT: "/categories/freshmeat",
  VEG: "/categories/pureveg",
  BOTH: "/categories/veg&nonveg",
  INSTA: "/categories/instamart",
};

/* ================= OFFERS ================= */

const OFFER_BANNERS = [
  {
    id: "meat",
    title: "Fresh Meat Offers",
    sub: "Flat ₹300 OFF",
    icon: "food-drumstick",
    bg: CATEGORY_THEME.MEAT,
  },
  {
    id: "veg",
    title: "Pure Veg Restaurants",
    sub: "Up to 40% OFF",
    icon: "leaf",
    bg: CATEGORY_THEME.VEG,
  },
  {
    id: "both",
    title: "Valentine Feast",
    sub: "50% OFF for couples",
    icon: "heart",
    bg: CATEGORY_THEME.BOTH,
  },
];

/* ================= VALENTINE COMBOS ================= */

const COMBOS = [
  { id: "1", title: "💖 Couple Dinner", sub: "₹499 Only" },
  { id: "2", title: "🍗 Meat + Cake", sub: "₹699 Only" },
  { id: "3", title: "🥗 Veg Love Combo", sub: "₹399 Only" },
];

/* ================= DASHBOARD ================= */

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={V.PRIMARY} />

      <SafeAreaView style={styles.safe} edges={["bottom"]}>
        <FloatingHearts />

        {/* HEADER */}
        <View
          style={[
            styles.headerWrapper,
            {
              paddingTop:
                Platform.OS === "android"
                  ? StatusBar.currentHeight
                  : insets.top,
            },
          ]}
        >
          <Text style={styles.watermark}>❤</Text>

          <View style={styles.headerContent}>
            <View>
              <Text style={styles.homeText}>
                🏠 Home <Ionicons name="chevron-down" size={14} />
              </Text>
              <Text style={styles.address}>Jafferkhanpet, Chennai</Text>
            </View>

            <Ionicons name="person-circle-outline" size={36} color="#fff" />
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={V.TEXT_SOFT} />
          <TextInput
            placeholder="Search food or restaurant"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            placeholderTextColor={V.TEXT_SOFT}
          />
          <MaterialCommunityIcons
            name="microphone"
            size={20}
            color={V.ACCENT}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 140 }}
        >
          <OfferBannerCarousel />

          {/* COMBOS */}
          <Text style={styles.sectionTitle}>💝 Valentine Combos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {COMBOS.map((c) => (
              <View key={c.id} style={styles.comboCard}>
                <Text style={styles.comboTitle}>{c.title}</Text>
                <Text style={styles.comboSub}>{c.sub}</Text>
              </View>
            ))}
          </ScrollView>

          {/* CATEGORY GRID */}
          <View style={styles.grid}>
            {renderCategory("FRESH MEAT", "food-drumstick", CATEGORY_THEME.MEAT, "MEAT")}
            {renderCategory("PURE VEG", "leaf", CATEGORY_THEME.VEG, "VEG")}
            {renderCategory("VEG & NON-VEG", "silverware-fork-knife", CATEGORY_THEME.BOTH, "BOTH")}
            {renderCategory("INSTAMART", "cart", CATEGORY_THEME.INSTA, "INSTA")}
          </View>
        </ScrollView>

        <View style={{ paddingBottom: insets.bottom }}>
          <BottomNav />
        </View>
      </SafeAreaView>
    </>
  );

  /* ================= CATEGORY RENDER ================= */

  function renderCategory(
    title: string,
    icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"],
    color: string,
    cat: "MEAT" | "VEG" | "BOTH" | "INSTA"
  ) {
    return (
      <TouchableOpacity
        style={styles.catCard}
        activeOpacity={0.85}
        onPress={() =>
          router.push({
            pathname: CATEGORY_ROUTE_MAP[cat],
            params: {
              category: cat,
              themeColor: color,
            },
          })
        }
      >
        <Text style={styles.catTitle}>{title}</Text>
        <MaterialCommunityIcons name={icon} size={34} color={color} />
      </TouchableOpacity>
    );
  }
}

/* ================= OFFER CAROUSEL ================= */

function OfferBannerCarousel() {
  const ref = useRef<FlatList<any>>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (index + 1) % OFFER_BANNERS.length;
      ref.current?.scrollToIndex({ index: next, animated: true });
      setIndex(next);
    }, 3500);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <FlatList
      ref={ref}
      data={OFFER_BANNERS}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <View style={[styles.offerBanner, { backgroundColor: item.bg }]}>
          <View>
            <Text style={styles.offerTitle}>{item.title}</Text>
            <Text style={styles.offerSub}>{item.sub}</Text>
          </View>
          <MaterialCommunityIcons name={item.icon} size={70} color="#fff" />
        </View>
      )}
    />
  );
}

/* ================= FLOATING HEART ================= */

function FloatingHearts() {
  const anim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(anim, {
        toValue: -100,
        duration: 6000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <Animated.View
      style={[styles.floatingHeart, { transform: [{ translateY: anim }] }]}
    >
      <MaterialCommunityIcons name="heart" size={22} color="#FB7185" />
    </Animated.View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: V.BG },

  headerWrapper: {
    backgroundColor: V.PRIMARY,
    paddingBottom: 30,
  },

  watermark: {
    position: "absolute",
    fontSize: 140,
    color: "rgba(255,255,255,0.08)",
    alignSelf: "center",
    top: 10,
  },

  headerContent: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  homeText: { color: "#fff", fontSize: 18, fontWeight: "800" },
  address: { color: "#FFE4E6", fontSize: 12 },

  searchBox: {
    flexDirection: "row",
    backgroundColor: V.CARD,
    margin: 16,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: V.BORDER,
    alignItems: "center",
  },

  searchInput: { flex: 1, marginHorizontal: 8 },

  offerBanner: {
    width: width - 32,
    margin: 16,
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  offerTitle: { color: "#fff", fontSize: 20, fontWeight: "800" },
  offerSub: { color: "#FFE4E6" },

  sectionTitle: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "800",
    color: V.TEXT_DARK,
  },

  comboCard: {
    backgroundColor: V.CARD,
    borderRadius: 16,
    padding: 16,
    margin: 12,
    borderWidth: 1,
    borderColor: V.BORDER,
  },

  comboTitle: { fontWeight: "800", color: V.TEXT_DARK },
  comboSub: { color: V.TEXT_SOFT },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    justifyContent: "space-between",
  },

  catCard: {
    width: width / 2 - 24,
    backgroundColor: V.CARD,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },

  catTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: V.TEXT_DARK,
    marginBottom: 6,
  },

  floatingHeart: {
    position: "absolute",
    right: 30,
    zIndex: 20,
  },
});
