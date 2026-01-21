import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

/* ❤️ VALENTINE THEME */
const COLORS = {
  primary: "#E53935",
  accent: "#EC407A",
  background: "#FFF1F2",
  card: "#FFFFFF",
  border: "#F8BBD0",
  textPrimary: "#212121",
  textSecondary: "#757575",
};

/* ---------------- MOCK CART DATA ---------------- */
const INITIAL_CART = [
  { id: "1", name: "Chicken Biryani", price: 220, qty: 1 },
  { id: "2", name: "Paneer Butter Masala", price: 180, qty: 2 },
];

const BOTTOM_NAV_HEIGHT = Platform.OS === "android" ? 64 : 72;

export default function CartPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [cart, setCart] = useState(INITIAL_CART);
  const [search, setSearch] = useState("");

  /* ---------------- CART LOGIC ---------------- */
  const increaseQty = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const filteredCart = cart.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const itemTotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const deliveryFee = itemTotal > 0 ? 30 : 0;
  const grandTotal = itemTotal + deliveryFee;

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right"]}>
      {/* STATUS BAR */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
      />

      {/* 🔴 TOOLBAR (100% SAFE) */}
      <View
        style={[
          styles.toolbar,
          {
            paddingTop: insets.top,
            height: 56 + insets.top,
          },
        ]}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>My Cart</Text>

        <View style={{ width: 26 }} />
      </View>

      {/* 🔍 SEARCH */}
      <View style={styles.searchBox}>
        <MaterialCommunityIcons name="magnify" size={22} color="#999" />
        <TextInput
          placeholder="Search cart items"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* 🛒 CART LIST */}
      <FlatList
        data={filteredCart}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom:
            BOTTOM_NAV_HEIGHT +
            insets.bottom +
            (cart.length > 0 ? 220 : 40),
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>

            <View style={styles.qtyBox}>
              <TouchableOpacity onPress={() => decreaseQty(item.id)}>
                <Text style={styles.qtyBtn}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qtyText}>{item.qty}</Text>

              <TouchableOpacity onPress={() => increaseQty(item.id)}>
                <Text style={styles.qtyBtn}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* 💰 SUMMARY (FLOATING & SAFE) */}
      {cart.length > 0 && (
        <View
          style={[
            styles.summary,
            {
              bottom: BOTTOM_NAV_HEIGHT + insets.bottom + 12,
            },
          ]}
        >
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Item Total</Text>
            <Text style={styles.summaryText}>₹{itemTotal}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Delivery Fee</Text>
            <Text style={styles.summaryText}>₹{deliveryFee}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Grand Total</Text>
            <Text style={styles.totalText}>₹{grandTotal}</Text>
          </View>

          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => router.push("/order/placeorder")}
          >
            <Text style={styles.orderText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 🧭 BOTTOM NAV (GESTURE SAFE) */}
      
    
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  toolbar: {
    backgroundColor: COLORS.primary,
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

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    margin: 16,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
  },

  cartItem: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  itemName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  itemPrice: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 10,
  },

  qtyBtn: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: "700",
    paddingHorizontal: 6,
  },

  qtyText: {
    fontSize: 14,
    fontWeight: "700",
    marginHorizontal: 6,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
  },

  summary: {
    position: "absolute",
    left: 16,
    right: 16,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    elevation: 10,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  summaryText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },

  totalText: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },

  orderButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  orderText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
