import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

/* ================= THEME MAP ================= */
const THEMES = {
  MIXED: {
    primary: "#E63946",
    background: "#FFF1F2",
    surface: "#FFF7F9",
    border: "#FADADD",
    textPrimary: "#7F1D1D",
    textSecondary: "#9F1239",
    accent: "#F43F5E",
    white: "#FFFFFF",
  },

  PURE_VEG: {
    primary: "#2E7D32",
    background: "#F1FFF4",
    surface: "#F6FFF8",
    border: "#C8E6C9",
    textPrimary: "#1B5E20",
    textSecondary: "#4CAF50",
    accent: "#66BB6A",
    white: "#FFFFFF",
  },

  MEAT: {
    primary: "#6D4C41",
    background: "#F5EFEA",
    surface: "#FAF6F2",
    border: "#D7CCC8",
    textPrimary: "#4E342E",
    textSecondary: "#795548",
    accent: "#8D6E63",
    white: "#FFFFFF",
  },
};

/* ================= PRODUCT DATA ================= */
const PRODUCT_DATA = {
  MEAT: {
    id: "M001",
    shopName: "Fresh Meat Shop",
    name: "Chicken Curry Cut",
    description:
      "Freshly cut tender chicken pieces, hygienically cleaned and ready to cook.",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    variants: [
      { label: "250 g", price: 120 },
      { label: "500 g", price: 230 },
      { label: "1 kg", price: 450 },
    ],
  },

  PURE_VEG: {
    id: "V001",
    shopName: "Pure Veg Restaurant",
    name: "Paneer Butter Masala",
    description:
      "Soft paneer cubes cooked in rich tomato butter gravy with mild spices.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    variants: [
      { label: "Half", price: 160 },
      { label: "Full", price: 280 },
    ],
  },

  MIXED: {
    id: "X001",
    shopName: "Veg & Non-Veg Restaurant",
    name: "Chicken Fried Rice",
    description:
      "Aromatic basmati rice tossed with chicken, veggies, and oriental spices.",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    variants: [
      { label: "Regular", price: 180 },
      { label: "Large", price: 260 },
    ],
  },
};

export default function ProductDetails() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

  /* 🔑 THEME + PRODUCT FROM ROUTE */
  const themeKey = String(params.theme || "MEAT") as
    | "MEAT"
    | "PURE_VEG"
    | "MIXED";

  const COLORS = THEMES[themeKey];
  const PRODUCT = PRODUCT_DATA[themeKey];

  const [qty, setQty] = useState(1);
  const [cartCount] = useState(2);
  const [selectedVariant, setSelectedVariant] = useState(
    PRODUCT.variants[0]
  );

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: COLORS.background }]}
      edges={["left", "right", "bottom"]}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View
        style={[
          styles.statusBarFill,
          { height: insets.top, backgroundColor: COLORS.primary },
        ]}
      />

      {/* 🔴 TOOLBAR */}
      <View style={[styles.toolbar, { backgroundColor: COLORS.primary }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={COLORS.white}
          />
        </TouchableOpacity>

        <Text style={[styles.toolbarTitle, { color: COLORS.white }]}>
          {PRODUCT.shopName}
        </Text>

        <TouchableOpacity onPress={() => router.push("/cart/cart")}>
          <MaterialCommunityIcons
            name="cart-outline"
            size={24}
            color={COLORS.white}
          />
          {cartCount > 0 && (
            <View
              style={[styles.cartBadge, { backgroundColor: COLORS.accent }]}
            >
              <Text style={styles.cartCount}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGE */}
        <Image source={{ uri: PRODUCT.image }} style={styles.image} />

        {/* DETAILS */}
        <View style={[styles.content, { backgroundColor: COLORS.surface }]}>
          <Text style={[styles.name, { color: COLORS.textPrimary }]}>
            {PRODUCT.name}
          </Text>

          <Text
            style={[styles.description, { color: COLORS.textSecondary }]}
          >
            {PRODUCT.description}
          </Text>

          {/* VARIANTS */}
          <View style={styles.variantRow}>
            {PRODUCT.variants.map((v) => (
              <TouchableOpacity
                key={v.label}
                style={[
                  styles.variantBtn,
                  {
                    borderColor: COLORS.primary,
                    backgroundColor:
                      selectedVariant.label === v.label
                        ? COLORS.primary
                        : "transparent",
                  },
                ]}
                onPress={() => setSelectedVariant(v)}
              >
                <Text
                  style={{
                    color:
                      selectedVariant.label === v.label
                        ? COLORS.white
                        : COLORS.primary,
                    fontWeight: "600",
                  }}
                >
                  {v.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* PRICE + QTY */}
          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: COLORS.primary }]}>
              ₹{selectedVariant.price}
            </Text>

            <View
              style={[styles.qtyBox, { borderColor: COLORS.primary }]}
            >
              <TouchableOpacity
                onPress={() => qty > 1 && setQty(qty - 1)}
                style={styles.qtyBtn}
              >
                <MaterialCommunityIcons
                  name="minus"
                  size={18}
                  color={COLORS.primary}
                />
              </TouchableOpacity>

              <Text style={[styles.qty, { color: COLORS.textPrimary }]}>
                {qty}
              </Text>

              <TouchableOpacity
                onPress={() => setQty(qty + 1)}
                style={styles.qtyBtn}
              >
                <MaterialCommunityIcons
                  name="plus"
                  size={18}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 🔽 BOTTOM BAR */}
      <View
        style={[
          styles.bottomBar,
          { backgroundColor: COLORS.surface, borderTopColor: COLORS.border },
        ]}
      >
        <View>
          <Text
            style={[styles.totalLabel, { color: COLORS.textSecondary }]}
          >
            Total
          </Text>
          <Text style={[styles.totalPrice, { color: COLORS.primary }]}>
            ₹{selectedVariant.price * qty}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: COLORS.primary }]}
          onPress={() => router.push("/cart/cart")}
        >
          <Text style={[styles.addText, { color: COLORS.white }]}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  safe: { flex: 1 },

  statusBarFill: {},

  toolbar: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  toolbarTitle: { fontSize: 16, fontWeight: "700" },

  cartBadge: {
    position: "absolute",
    top: -6,
    right: -8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  cartCount: { color: "#fff", fontSize: 11, fontWeight: "700" },

  image: { width: "100%", height: 240 },

  content: { padding: 16 },

  name: { fontSize: 20, fontWeight: "800", marginBottom: 6 },

  description: { fontSize: 14, lineHeight: 20 },

  variantRow: { flexDirection: "row", marginTop: 16, gap: 10 },

  variantBtn: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  price: { fontSize: 20, fontWeight: "800" },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    height: 36,
  },

  qtyBtn: { paddingHorizontal: 12 },

  qty: {
    fontSize: 15,
    fontWeight: "700",
    minWidth: 24,
    textAlign: "center",
  },

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },

  totalLabel: { fontSize: 12 },

  totalPrice: { fontSize: 18, fontWeight: "800", marginTop: 2 },

  addBtn: {
    height: 40,
    paddingHorizontal: 26,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  addText: { fontSize: 14, fontWeight: "700" },
});
