import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
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
  textDark: "#7F1D1D",
  textMuted: "#9F1239",
};

/* ---------------- MOCK NOTIFICATIONS ---------------- */

const NOTIFICATIONS = [
  {
    id: "1",
    title: "Order Delivered",
    message: "Your order ORD123 has been delivered successfully.",
    time: "2 mins ago",
    read: false,
  },
  {
    id: "2",
    title: "Order Out for Delivery",
    message: "Your food is on the way. Rider will reach soon.",
    time: "30 mins ago",
    read: true,
  },
  {
    id: "3",
    title: "New Offer 🎉",
    message: "Flat 20% OFF on your next order. Limited time!",
    time: "Yesterday",
    read: true,
  },
];

export default function NotificationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <View style={styles.root}>
      {/* ✅ PAINT NOTCH AREA */}
      <View
        style={[
          styles.notch,
          { height: insets.top },
        ]}
      />

      {/* ✅ STATUS BAR */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.card}
      />

      {/* ✅ TOOLBAR (FIXED HEIGHT) */}
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={styles.toolbarSide}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={"#FFFF"}
          />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>Notifications</Text>

        <View style={styles.toolbarSide} />
      </View>

      {/* ===== LIST ===== */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notifications</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.notificationCard,
              !item.read && styles.unreadCard,
            ]}
            onPress={() => markAsRead(item.id)}
          >
            {/* ICON */}
            <View
              style={[
                styles.iconBox,
                !item.read && styles.iconBoxUnread,
              ]}
            >
              <MaterialCommunityIcons
                name={
                  item.title.includes("Order")
                    ? "shopping-outline"
                    : "bell-outline"
                }
                size={22}
                color={
                  item.read
                    ? COLORS.textMuted
                    : COLORS.primary
                }
              />
            </View>

            {/* TEXT */}
            <View style={styles.textBox}>
              <Text
                style={[
                  styles.title,
                  !item.read && styles.unreadTitle,
                ]}
              >
                {item.title}
              </Text>
              <Text style={styles.message}>
                {item.message}
              </Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>

            {!item.read && <View style={styles.dot} />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* 🔥 NOTCH PAINT */
  notch: {
    backgroundColor: COLORS.primary,
  },

  /* ===== TOOLBAR ===== */
  toolbar: {
    height: 56,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  toolbarSide: {
    width: 56,
    alignItems: "center",
    justifyContent: "center",
  },

  toolbarTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFF",
  },

  /* ===== LIST ===== */
  list: {
    padding: 16,
    paddingBottom: 40,
  },

  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  unreadCard: {
    backgroundColor: "#FFF5F6",
    borderColor: COLORS.primary,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FCE4EC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  iconBoxUnread: {
    backgroundColor: "#FADADD",
  },

  textBox: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textDark,
  },

  unreadTitle: {
    fontWeight: "800",
  },

  message: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  time: {
    fontSize: 11,
    color: "#B71C1C",
    marginTop: 4,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginLeft: 8,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: COLORS.textMuted,
  },
});
