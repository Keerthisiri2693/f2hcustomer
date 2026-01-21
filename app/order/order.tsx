import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/* ❤️ VALENTINE THEME */
const COLORS = {
  primary: "#E63946",
  primaryDark: "#9F1239",
  background: "#FFF1F2",
  surface: "#FFF7F9",
  border: "#FADADD",
  textPrimary: "#7F1D1D",
  textSecondary: "#9F1239",
  accent: "#F43F5E",
};

/* ---------------- MOCK ORDER DATA ---------------- */
const ORDERS = [
  {
    id: "ORD123",
    restaurant: "SS Hyderabad Biryani",
    items: "Chicken Biryani ×1",
    total: 220,
    status: "Delivered",
  },
  {
    id: "ORD124",
    restaurant: "Hotel Annapoorna",
    items: "Veg Meals ×2",
    total: 240,
    status: "On the Way",
  },
  {
    id: "ORD125",
    restaurant: "Andhra Spice",
    items: "Paneer Butter Masala ×1",
    total: 180,
    status: "Cancelled",
  },
];

const BOTTOM_NAV_HEIGHT = 64;

export default function OrdersPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");

  const filteredOrders = ORDERS.filter(
    (o) =>
      o.restaurant.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.root}>
      {/* STATUS BAR */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
      />

      {/* 🔥 NOTCH FILL (ONLY THIS HANDLES SAFE AREA) */}
      <View style={[styles.statusFill, { height: insets.top }]} />

      {/* 🔴 TOOLBAR (EXACT HEIGHT = 56) */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>My Orders</Text>
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
          placeholder="Search orders by name or ID"
          placeholderTextColor={COLORS.textSecondary}
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* 📦 ORDER LIST */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: BOTTOM_NAV_HEIGHT + insets.bottom + 16,
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No Orders Found</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderCard}
            activeOpacity={0.85}
            onPress={() => router.push(`/order/${item.id}`)}
          >
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{item.id}</Text>
              <StatusBadge status={item.status} />
            </View>

            <Text style={styles.restaurant}>{item.restaurant}</Text>
            <Text style={styles.items}>{item.items}</Text>

            <View style={styles.orderFooter}>
              <Text style={styles.total}>₹{item.total}</Text>
              <Text style={styles.viewDetails}>View Details</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

/* ---------------- STATUS BADGE ---------------- */
function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Delivered"
      ? "#2E7D32"
      : status === "On the Way"
      ? "#F9A825"
      : "#D32F2F";

  return (
    <View style={[styles.statusBadge, { borderColor: color }]}>
      <Text style={[styles.statusText, { color }]}>{status}</Text>
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  statusFill: {
    backgroundColor: COLORS.primary,
  },

  toolbar: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
  },

  toolbarTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
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
    color: COLORS.textPrimary,
  },

  orderCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },

  restaurant: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 6,
    color: COLORS.textPrimary,
  },

  items: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  total: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.primary,
  },

  viewDetails: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "700",
  },

  statusBadge: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: COLORS.textSecondary,
  },
});
