import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

/* 🌳 WOOD BROWN – FRESH MEAT THEME */
const COLORS = {
  primary: "#6D4C41",
  primaryDark: "#4E342E",

  background: "#F5EFEA",
  surface: "#FFFFFF",
  border: "#D7CCC8",

  textPrimary: "#3E2723",
  textSecondary: "#6D4C41",

  accent: "#A1887F",
};

/* ---------------- MOCK PRODUCTS ---------------- */

const PRODUCT_MAP: Record<string, any[]> = {
  "1": [
    {
      id: "p1",
      name: "Chicken Curry Cut",
      quantity: 1,
      unit: "kg",
      price: 220,
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    },
    {
      id: "p2",
      name: "Chicken Breast",
      quantity: 500,
      unit: "g",
      price: 260,
      image: "https://images.unsplash.com/photo-1604908177522-402c66f2c13f",
    },
  ],
  "2": [
    {
      id: "p3",
      name: "Mutton Curry Cut",
      quantity: 1,
      unit: "kg",
      price: 620,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    },
  ],
};

/* normalize params safely */
const norm = (v: any) => (Array.isArray(v) ? v[0] : v ?? "");

export default function ProductList() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

  const shopId = norm(params.shopId);
  const shopName = norm(params.shopName);
  const shopImage = norm(params.shopImage);
  const rating = norm(params.rating);
  const distance = norm(params.distance);
  const deliveryTime = norm(params.deliveryTime);

  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});

  const products = PRODUCT_MAP[String(shopId)] ?? [];

  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, products]
  );

  /* 🛒 CART LOGIC */
  const addItem = (id: string) =>
    setCart((c) => ({ ...c, [id]: 1 }));

  const incItem = (id: string) =>
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));

  const decItem = (id: string) =>
    setCart((c) => {
      const q = (c[id] ?? 0) - 1;
      if (q <= 0) {
        const { [id]: _, ...rest } = c;
        return rest;
      }
      return { ...c, [id]: q };
    });

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={[styles.statusBarFill, { height: insets.top }]} />

      {/* TOOLBAR */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>{shopName || "Shop"}</Text>

        <TouchableOpacity onPress={() => router.push("/cart/cart")}>
          <MaterialCommunityIcons name="cart-outline" size={24} color="#FFF" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartCount}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* SHOP HEADER */}
      <View style={styles.shopHeader}>
        <Image
          source={{
            uri:
              shopImage ||
              "https://images.unsplash.com/photo-1601050690597-df0568f70950",
          }}
          style={styles.banner}
        />
        <Text style={styles.shopName}>{shopName}</Text>
        <Text style={styles.meta}>
          ⭐ {rating || "4.5"} • {distance || "5 km"} •{" "}
          {deliveryTime || "20 mins"}
        </Text>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <MaterialCommunityIcons
          name="magnify"
          size={22}
          color={COLORS.textSecondary}
        />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search products..."
          placeholderTextColor={COLORS.textSecondary}
          style={styles.searchInput}
        />
      </View>

      {/* PRODUCT LIST */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const qty = cart[item.id] || 0;

          return (
            <View style={styles.productCard}>
              <TouchableOpacity
                style={styles.row}
                activeOpacity={0.85}
                onPress={() =>
                  router.push({
                    pathname: "/productdetails/[id]",
                    params: {
                      id: item.id,
                      theme: "MEAT", // 🌳 Wood Brown
                    },
                  })
                }
              >
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productQty}>
                    {item.quantity}
                    {item.unit}
                  </Text>
                  <Text style={styles.productPrice}>₹{item.price}</Text>
                </View>
              </TouchableOpacity>

              {qty === 0 ? (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addItem(item.id)}
                >
                  <Text style={styles.addText}>ADD</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.qtyBox}>
                  <TouchableOpacity onPress={() => decItem(item.id)}>
                    <Text style={styles.qtyBtn}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{qty}</Text>
                  <TouchableOpacity onPress={() => incItem(item.id)}>
                    <Text style={styles.qtyBtn}>+</Text>
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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  statusBarFill: { backgroundColor: COLORS.primary },

  toolbar: {
    height: 48,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  toolbarTitle: { fontSize: 17, fontWeight: "700", color: "#FFF" },

  cartBadge: {
    position: "absolute",
    right: -6,
    top: -4,
    backgroundColor: COLORS.accent,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  cartCount: { fontSize: 11, fontWeight: "700", color: "#FFF" },

  shopHeader: { padding: 16, backgroundColor: COLORS.surface },

  banner: { width: "100%", height: 160, borderRadius: 14 },

  shopName: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
    color: COLORS.textPrimary,
  },

  meta: { color: COLORS.textSecondary, marginTop: 4 },

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

  listContent: { paddingHorizontal: 16, paddingBottom: 40 },

  productCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  row: { flexDirection: "row", alignItems: "center" },

  productImage: { width: 70, height: 70, borderRadius: 10 },

  productInfo: { flex: 1, marginLeft: 12 },

  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  productQty: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  productPrice: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
  },

  addButton: {
    alignSelf: "flex-end",
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },

  addText: { color: COLORS.primary, fontWeight: "700" },

  qtyBox: {
    alignSelf: "flex-end",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 8,
  },

  qtyBtn: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    paddingHorizontal: 6,
  },

  qtyText: {
    fontSize: 14,
    fontWeight: "700",
    marginHorizontal: 6,
    color: COLORS.textPrimary,
  },
});
