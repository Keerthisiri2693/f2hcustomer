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

/* ================= 💖 VALENTINE THEME ================= */

const V = {
  PRIMARY: "#E11D48",
  BG: "#FFF1F2",
  CARD: "#FFFFFF",
  ACCENT: "#FB7185",
  BORDER: "#FBCFE8",
  TEXT_DARK: "#7F1D1D",
  TEXT_SOFT: "#9F1239",
  HEART: "#FB7185",
};

const CATEGORY_THEME = {
  MEAT: "#B91C1C",
  VEG: "#15803D",
  BOTH: "#9F1239",
  INSTA: "#FB7185",
};

const CATEGORY_ROUTE_MAP = {
  MEAT: "/categories/freshmeat",
  VEG: "/categories/pureveg",
  BOTH: "/categories/veg&nonveg",
  INSTA: "/categories/instamart",
};

/* ================= DATA ================= */

const OFFER_BANNERS = [
  {
    id: "1",
    title: "💘 Valentine Special",
    sub: "Flat ₹300 OFF for Couples",
    icon: "heart",
    bg: "#9F1239",
    couples: true,
  },
  {
    id: "2",
    title: "🍗 Love & Meat Combo",
    sub: "Upto 40% OFF",
    icon: "food-drumstick",
    bg: "#B91C1C",
    couples: false,
  },
  {
    id: "3",
    title: "🥗 Veg Love Feast",
    sub: "Pure Veg • 30% OFF",
    icon: "leaf-heart",
    bg: "#15803D",
    couples: true,
  },
];

const COMBOS = [
  { id: "1", title: "💑 Couple Dinner", sub: "₹499 Only", couples: true },
  { id: "2", title: "🍗 Meat + Cake", sub: "₹699 Only", couples: false },
  { id: "3", title: "🥗 Veg Love Combo", sub: "₹399 Only", couples: true },
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
        <HeartConfetti />

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
              <Text style={styles.address}>
                Delivering love in Chennai 💌
              </Text>
            </View>
<Ionicons
  name="person-circle-outline"
  size={36}
  color="#fff"
  onPress={() =>
    router.push({
      pathname: "/OrderTrackingScreen",
      params: { orderNo: "order_123" }, // 👈 pass order no
    })
  }
/>

          </View>
        </View>

        {/* COUNTDOWN */}
        <ValentineCountdown />

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={V.TEXT_SOFT} />
          <TextInput
            placeholder="Search food, love & restaurants"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            placeholderTextColor={V.TEXT_SOFT}
          />
          <MaterialCommunityIcons name="heart" size={20} color={V.ACCENT} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
          <OfferBannerCarousel />

          {/* COMBOS */}
          <Text style={styles.sectionTitle}>💝 Valentine Combos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {COMBOS.map((c) => (
              <View key={c.id} style={styles.comboCard}>
                {c.couples}
                <Text style={styles.comboTitle}>{c.title}</Text>
                <Text style={styles.comboSub}>{c.sub}</Text>
              </View>
            ))}
          </ScrollView>

          {/* CATEGORIES */}
          <View style={styles.grid}>
            {renderCategory("FRESH MEAT", "food-drumstick", CATEGORY_THEME.MEAT, "MEAT")}
            {renderCategory("PURE VEG", "leaf", CATEGORY_THEME.VEG, "VEG")}
            {renderCategory("VEG & NON-VEG", "silverware-fork-knife", CATEGORY_THEME.BOTH, "BOTH")}
            {renderCategory("INSTAMART", "cart-heart", CATEGORY_THEME.INSTA, "INSTA")}
          </View>
        </ScrollView>

        <View style={{ paddingBottom: insets.bottom }}>
          <BottomNav />
        </View>
      </SafeAreaView>
    </>
  );

  function renderCategory(title, icon, color, cat) {
    return (
      <TouchableOpacity
        style={styles.catCard}
        onPress={() =>
          router.push({
            pathname: CATEGORY_ROUTE_MAP[cat],
            params: { category: cat, themeColor: color },
          })
        }
      >
        <MaterialCommunityIcons name={icon} size={34} color={color} />
        <Text style={styles.catTitle}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

/* ================= COUNTDOWN ================= */

function ValentineCountdown() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const target = new Date("2026-02-14T00:00:00");

    const update = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("💖 Happy Valentine’s Day!");
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      setTimeLeft(`💘 ${d}d ${h}h ${m}m left`);
    };

    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.countdownCard}>
      <MaterialCommunityIcons name="heart" size={18} color={V.PRIMARY} />
      <Text style={styles.countdownText}>{timeLeft}</Text>
    </View>
  );
}

/* ================= OFFER CAROUSEL ================= */

function OfferBannerCarousel() {
  const ref = useRef(null);
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
          {item.couples}
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

/* ================= CONFETTI ================= */

function HeartConfetti() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <FloatingHeart key={i} delay={i * 800} />
      ))}
    </>
  );
}

function FloatingHeart({ delay }) {
  const anim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: -120,
          duration: 6000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.floatingHeart, { transform: [{ translateY: anim }] }]}>
      <MaterialCommunityIcons name="heart" size={20} color={V.HEART} />
    </Animated.View>
  );
}

/* ================= BADGE ================= */

/*function CoupleBadge() {
  return (
    <View style={styles.coupleBadge}>
      <MaterialCommunityIcons name="heart-multiple" size={12} color={V.PRIMARY} />
      <Text style={styles.coupleText}>For Couples</Text>
    </View>
  );
}*/

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: V.BG },

  headerWrapper: { backgroundColor: V.PRIMARY, paddingBottom: 30 },

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

  countdownCard: {
    margin: 16,
    padding: 12,
    backgroundColor: V.CARD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: V.BORDER,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  countdownText: { fontWeight: "800", color: V.TEXT_DARK },

  searchBox: {
    flexDirection: "row",
    backgroundColor: V.CARD,
    margin: 16,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: V.BORDER,
    alignItems: "center",
  },

  searchInput: { flex: 1, marginHorizontal: 8 },

  offerBanner: {
    width: width - 32,
    margin: 16,
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
  },

  offerTitle: { color: "#fff", fontSize: 22, fontWeight: "800" },
  offerSub: { color: "#FFE4E6" },

  sectionTitle: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "800",
    color: V.TEXT_DARK,
  },

  comboCard: {
    backgroundColor: V.CARD,
    borderRadius: 18,
    padding: 16,
    margin: 12,
    borderWidth: 1,
    borderColor: V.BORDER,
    position: "relative",
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
    marginTop: 6,
  },

  coupleBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    minWidth: 90,
    justifyContent: "center",
    elevation: 2,
  },

  coupleText: {
    fontSize: 11,
    fontWeight: "800",
    color: V.PRIMARY,
  },

  floatingHeart: {
    position: "absolute",
    right: Math.random() * width,
    zIndex: 20,
  },
});
