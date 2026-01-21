import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

/* ================= GLOBAL VALENTINE THEME ================= */

const APP_THEME = {
  background: "#FFF1F2",
  surface: "#FFFFFF",
  textPrimary: "#7F1D1D",
  textSecondary: "#9F1239",
  badge: "#EC407A",
  open: "#2E7D32",
  closed: "#D32F2F",
};

/* ================= TYPE THEMES ================= */

const TYPE_THEME = {
  veg: {
    primary: "#2E7D32",
    border: "#C8E6C9",
  },
  nonveg: {
    primary: "#6D4C41", // 🌲 Wood brown
    border: "#D7CCC8",
  },
  mixed: {
    primary: "#E11D48", // ❤️ Valentine red
    border: "#FADADD",
  },
} as const;

type ShopType = keyof typeof TYPE_THEME;

/* ---------------- OPEN / CLOSE CHECK ---------------- */

const isShopOpenNow = (openTime?: string, closeTime?: string) => {
  if (!openTime || !closeTime) return false;

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

/* ---------------- PRODUCTS ---------------- */

const PRODUCT_MAP: Record<string, any[]> = {
  "1": [
    {
      id: "v1",
      name: "Veg Meals",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    },
    {
      id: "v2",
      name: "Paneer Butter Masala",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    },
  ],
  "2": [
    {
      id: "n1",
      name: "Chicken Biryani",
      price: 220,
      image:
        "https://images.unsplash.com/photo-1598515214146-dab39da1243d",
    },
    {
      id: "n2",
      name: "Grill Chicken",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1598515214146-dab39da1243d",
    },
  ],
};

export default function RestaurantProductList() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const shopId = String(params.shopId ?? "");
  const shopName = String(params.shopName ?? "");
  const shopImage = String(params.shopImage ?? "");
  const openTime = params.openTime as string;
  const closeTime = params.closeTime as string;

  /* ✅ SAFE TYPE NORMALIZATION */
  const rawType = params.type;
  const type: ShopType =
    rawType === "veg" || rawType === "nonveg" || rawType === "mixed"
      ? rawType
      : "mixed";

  const ACTIVE_THEME = TYPE_THEME[type];

  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});

  const isOpenNow = isShopOpenNow(openTime, closeTime);
  const products = PRODUCT_MAP[shopId] ?? [];

  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, products]
  );

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const addItem = (id: string) =>
    setCart((c) => ({ ...c, [id]: 1 }));

  const incItem = (id: string) =>
    setCart((c) => ({ ...c, [id]: c[id] + 1 }));

  const decItem = (id: string) =>
    setCart((c) => {
      const q = c[id] - 1;
      if (q <= 0) {
        const { [id]: _, ...rest } = c;
        return rest;
      }
      return { ...c, [id]: q };
    });

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: APP_THEME.background }]}
    >
      <StatusBar barStyle="light-content" backgroundColor={ACTIVE_THEME.primary} />

      {/* TOOLBAR */}
      <View
        style={[styles.toolbar, { backgroundColor: ACTIVE_THEME.primary }]}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>{shopName}</Text>

        <View>
          <MaterialCommunityIcons name="cart-outline" size={26} color="#fff" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartCount}>{cartCount}</Text>
            </View>
          )}
        </View>
      </View>

      {/* SHOP HEADER */}
      <View style={styles.shopHeader}>
        <Image source={{ uri: shopImage }} style={styles.banner} />
        <Text style={styles.shopName}>{shopName}</Text>
        <Text
          style={{
            color: isOpenNow ? APP_THEME.open : APP_THEME.closed,
          }}
        >
          {isOpenNow ? "Open now" : "Closed"}
        </Text>
      </View>

      {/* SEARCH */}
      <View
        style={[
          styles.searchBox,
          { borderColor: ACTIVE_THEME.border },
        ]}
      >
        <MaterialCommunityIcons name="magnify" size={22} color="#999" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search items..."
          style={styles.searchInput}
        />
      </View>

      {/* PRODUCT LIST */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const qty = cart[item.id] || 0;

         return (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={() =>
      router.push({
        pathname: "/productdetails/[id]",
        params: {
          id: item.id,            // 🔑 required for [id]
         theme: "MIXED",                  // veg | nonveg | mixed
        },
      })
    }
  >
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text
          style={{
            color: ACTIVE_THEME.primary,
            fontWeight: "700",
          }}
        >
          ₹{item.price}
        </Text>
      </View>

      {/* 🛑 STOP PROPAGATION FOR BUTTONS */}
      {qty === 0 ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={(e) => {
            e.stopPropagation();
            addItem(item.id);
          }}
          style={[
            styles.addButton,
            { borderColor: ACTIVE_THEME.primary },
          ]}
        >
          <Text
            style={{
              color: ACTIVE_THEME.primary,
              fontWeight: "700",
            }}
          >
            ADD
          </Text>
        </TouchableOpacity>
      ) : (
        <View
          style={[
            styles.qtyBox,
            { borderColor: ACTIVE_THEME.primary },
          ]}
        >
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              decItem(item.id);
            }}
          >
            <Text style={{ color: ACTIVE_THEME.primary }}>−</Text>
          </TouchableOpacity>

          <Text style={{ marginHorizontal: 8 }}>{qty}</Text>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              incItem(item.id);
            }}
          >
            <Text style={{ color: ACTIVE_THEME.primary }}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

        }}
      />
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

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

  toolbarTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },

  cartBadge: {
    position: "absolute",
    right: -6,
    top: -4,
    backgroundColor: APP_THEME.badge,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  cartCount: { color: "#fff", fontSize: 11, fontWeight: "700" },

  shopHeader: { padding: 16 },
  banner: { width: "100%", height: 160, borderRadius: 14 },
  shopName: { fontSize: 22, fontWeight: "700", marginTop: 6 },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
  },

  searchInput: { flex: 1, marginLeft: 8 },

  listContent: { paddingHorizontal: 16, paddingBottom: 40 },

  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 14,
    padding: 10,
    elevation: 2,
  },

  productImage: { width: 70, height: 70, borderRadius: 10 },
  productInfo: { flex: 1, marginLeft: 12 },
  productName: { fontSize: 16, fontWeight: "600" },

  addButton: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
  },
});
