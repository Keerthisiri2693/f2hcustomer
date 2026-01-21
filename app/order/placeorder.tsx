import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/* ❤️ VALENTINE THEME */
const COLORS = {
  primary: "#E53935",
  accent: "#EC407A",
  background: "#FFF1F2",
  card: "#FFFFFF",
  border: "#F8BBD0",
  textPrimary: "#7F1D1D",
  textSecondary: "#9F1239",
};

/* ---------------- MOCK CART ---------------- */
const CART = {
  items: [
    { name: "Chicken Biryani", qty: 1, price: 220 },
    { name: "Coke", qty: 1, price: 40 },
  ],
  deliveryFee: 30,
};

export default function PlaceOrderPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  /* 📍 ADDRESS STATE */
  const [address, setAddress] = useState(
    "No. 23, Anna Nagar West,\nChennai - 600040"
  );
  const [editing, setEditing] = useState(false);

  const [payment, setPayment] = useState<"COD" | "ONLINE">("COD");

  const itemTotal = CART.items.reduce(
    (sum, i) => sum + i.qty * i.price,
    0
  );
  const grandTotal = itemTotal + CART.deliveryFee;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* 🔴 TOOLBAR */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={26} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>Place Order</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: 140 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* 📍 DELIVERY ADDRESS */}
        <View style={styles.card}>
          <View style={styles.addressHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>

            <TouchableOpacity onPress={() => setEditing(!editing)}>
              <MaterialCommunityIcons
                name={editing ? "check" : "pencil"}
                size={20}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          {editing ? (
            <TextInput
              value={address}
              onChangeText={setAddress}
              multiline
              style={styles.addressInput}
            />
          ) : (
            <Text style={styles.addressText}>{address}</Text>
          )}
        </View>

        {/* 🛒 ORDER ITEMS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          {CART.items.map((item, i) => (
            <View key={i} style={styles.itemRow}>
              <Text style={styles.itemName}>
                {item.name} ×{item.qty}
              </Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
          ))}
        </View>

        {/* 💳 PAYMENT */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              payment === "COD" && styles.paymentActive,
            ]}
            onPress={() => setPayment("COD")}
          >
            <MaterialCommunityIcons
              name="cash"
              size={22}
              color={payment === "COD" ? COLORS.primary : "#999"}
            />
            <Text style={styles.paymentText}>Cash on Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              payment === "ONLINE" && styles.paymentActive,
            ]}
            onPress={() => setPayment("ONLINE")}
          >
            <MaterialCommunityIcons
              name="credit-card-outline"
              size={22}
              color={payment === "ONLINE" ? COLORS.primary : "#999"}
            />
            <Text style={styles.paymentText}>Online Payment</Text>
          </TouchableOpacity>
        </View>

        {/* 💰 BILL */}
        <View style={styles.card}>
          <View style={styles.billRow}>
            <Text>Item Total</Text>
            <Text>₹{itemTotal}</Text>
          </View>

          <View style={styles.billRow}>
            <Text>Delivery Fee</Text>
            <Text>₹{CART.deliveryFee}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.billRow}>
            <Text style={styles.total}>Grand Total</Text>
            <Text style={styles.total}>₹{grandTotal}</Text>
          </View>
        </View>
      </ScrollView>

      {/* ❤️ PLACE ORDER (GESTURE SAFE) */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: 16 + insets.bottom },
        ]}
      >
        <TouchableOpacity
          style={styles.placeBtn}
          onPress={() => router.replace("/order/ordersuccess")}
        >
          <Text style={styles.placeText}>
            Place Order • ₹{grandTotal}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

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
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },

  content: {
    padding: 16,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  addressText: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },

  addressInput: {
    marginTop: 8,
    minHeight: 70,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    textAlignVertical: "top",
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  itemName: { fontSize: 14 },
  itemPrice: { fontSize: 14, fontWeight: "600" },

  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
  },

  paymentActive: {
    borderColor: COLORS.primary,
    backgroundColor: "#FFF5F6",
  },

  paymentText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
  },

  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },

  total: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  placeBtn: {
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  placeText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
