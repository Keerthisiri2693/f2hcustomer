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

/* ================= THEME MAP ================= */
const THEMES = {
  PURE_VEG: {
    primary: "#2E7D32",
    green: "#2E7D32",
    red: "#D32F2F",
    background: "#F1FFF4",
    surface: "#F6FFF8",
    border: "#C8E6C9",
    textPrimary: "#1B5E20",
    textSecondary: "#4CAF50",
  },

  MEAT: {
    primary: "#E63946", // ❤️ Valentine Red
    green: "#22C55E",
    red: "#EF4444",
    background: "#FFF1F2",
    surface: "#FFF7F9",
    border: "#FADADD",
    textPrimary: "#7F1D1D",
    textSecondary: "#9F1239",
  },

  MIXED: {
    primary: "#6D4C41", // 🌲 Wood Brown
    green: "#2E7D32",
    red: "#D32F2F",
    background: "#F5EFEA",
    surface: "#FAF6F2",
    border: "#D7CCC8",
    textPrimary: "#4E342E",
    textSecondary: "#795548",
  },
};

/* ---------------- SAFE OPEN / CLOSE ---------------- */
const isShopOpenNow = (openTime?: string, closeTime?: string) => {
  if (!openTime || !closeTime) return true;

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
      id: "v3",
      name: "Idli (4 pcs)",
      price: 40,
      image:
        "https://images.unsplash.com/photo-1589308078059-9725e7e36d2b",
    },
    {
      id: "v4",
      name: "Masala Dosa",
      price: 70,
      image:
        "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46",
    },
  ],
};

export default function VegProductList() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const themeKey = String(params.theme || "PURE_VEG");
  const COLORS = THEMES[themeKey] || THEMES.PURE_VEG;

  const shopId = String(params.shopId || "1");
  const shopName = String(params.shopName || "Shop");
  const shopImage = String(params.shopImage || "");
  const rating = params.rating || "4.5";
  const distance = params.distance || "5 km";
  const deliveryTime = params.deliveryTime || "20 mins";
  const openTime = params.openTime as string | undefined;
  const closeTime = params.closeTime as string | undefined;

  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});

  const products = PRODUCT_MAP[shopId] || [];
  const isOpenNow = isShopOpenNow(openTime, closeTime);

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
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));

  const decItem = (id: string) =>
    setCart((c) => {
      const q = (c[id] || 0) - 1;
      if (q <= 0) {
        const { [id]: _, ...rest } = c;
        return rest;
      }
      return { ...c, [id]: q };
    });

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* TOOLBAR */}
      <View
        style={[
          styles.toolbar,
          { backgroundColor: COLORS.primary },
        ]}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>{shopName}</Text>

        <View>
          <MaterialCommunityIcons
            name="cart-outline"
            size={26}
            color="#fff"
          />
          {cartCount > 0 && (
            <View
              style={[
                styles.cartBadge,
                { backgroundColor: COLORS.green },
              ]}
            >
              <Text style={styles.cartCount}>{cartCount}</Text>
            </View>
          )}
        </View>
      </View>

      {/* SHOP HEADER */}
      <View style={styles.shopHeader}>
        {!!shopImage && (
          <Image source={{ uri: shopImage }} style={styles.banner} />
        )}

        <Text
          style={[
            styles.shopName,
            { color: COLORS.textPrimary },
          ]}
        >
          {shopName}
        </Text>

        <Text style={{ color: COLORS.textSecondary }}>
          ⭐ {rating} • {distance} • {deliveryTime}
        </Text>

        <Text
          style={{
            marginTop: 4,
            color: isOpenNow ? COLORS.green : COLORS.red,
          }}
        >
          {isOpenNow ? "Open now" : "Closed"}
        </Text>
      </View>

      {/* SEARCH */}
      <View
        style={[
          styles.searchBox,
          { borderColor: COLORS.border, backgroundColor: COLORS.surface },
        ]}
      >
        <MaterialCommunityIcons
          name="magnify"
          size={22}
          color={COLORS.textSecondary}
        />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search items..."
          placeholderTextColor={COLORS.textSecondary}
          style={styles.searchInput}
        />
      </View>

      {/* PRODUCTS */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const qty = cart[item.id] || 0;

          return (
            <View
              style={[
                styles.productCard,
                {
                  backgroundColor: COLORS.surface,
                  borderColor: COLORS.border,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.productMain}
                onPress={() =>
                  router.push({
                    pathname: "/productdetails/[id]",
                    params: {
                      ...item,
                      theme: "PURE_VEG",
                    },
                  })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />
                <View style={styles.productInfo}>
                  <Text
                    style={[
                      styles.productName,
                      { color: COLORS.textPrimary },
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[
                      styles.productPrice,
                      { color: COLORS.primary },
                    ]}
                  >
                    ₹{item.price}
                  </Text>
                </View>
              </TouchableOpacity>

              {qty === 0 ? (
                <TouchableOpacity
                  onPress={() => addItem(item.id)}
                  style={[
                    styles.addButton,
                    { borderColor: COLORS.primary },
                  ]}
                >
                  <Text
                    style={[
                      styles.addText,
                      { color: COLORS.primary },
                    ]}
                  >
                    ADD
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={[
                    styles.qtyBox,
                    { borderColor: COLORS.primary },
                  ]}
                >
                  <TouchableOpacity onPress={() => decItem(item.id)}>
                    <Text
                      style={[
                        styles.qtyBtn,
                        { color: COLORS.primary },
                      ]}
                    >
                      −
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyText}>{qty}</Text>

                  <TouchableOpacity onPress={() => incItem(item.id)}>
                    <Text
                      style={[
                        styles.qtyBtn,
                        { color: COLORS.primary },
                      ]}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
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

  toolbarTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  cartBadge: {
    position: "absolute",
    right: -6,
    top: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  cartCount: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  shopHeader: { padding: 16 },
  banner: { width: "100%", height: 160, borderRadius: 14 },
  shopName: { fontSize: 22, fontWeight: "700", marginTop: 6 },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
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
    borderRadius: 14,
    marginBottom: 14,
    padding: 10,
    borderWidth: 1,
  },

  productMain: { flexDirection: "row", alignItems: "center", flex: 1 },

  productImage: { width: 70, height: 70, borderRadius: 10 },
  productInfo: { flex: 1, marginLeft: 12 },

  productName: { fontSize: 16, fontWeight: "600" },

  productPrice: { marginTop: 4, fontSize: 14, fontWeight: "700" },

  addButton: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },

  addText: { fontWeight: "700", fontSize: 12 },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
  },

  qtyBtn: { fontSize: 18, fontWeight: "700" },
  qtyText: { fontWeight: "700", marginHorizontal: 6 },
});
