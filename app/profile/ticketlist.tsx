import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
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
  open: "#F9A825",
  progress: "#1976D2",
  resolved: "#2E7D32",
};

/* ---------------- MOCK TICKETS ---------------- */

const TICKETS = [
  {
    id: "TKT001",
    subject: "Refund not received",
    category: "Payment / Refund",
    status: "Open",
    date: "12 Sep 2025",
  },
  {
    id: "TKT002",
    subject: "Order delayed",
    category: "Delivery Delay",
    status: "In Progress",
    date: "10 Sep 2025",
  },
  {
    id: "TKT003",
    subject: "Wrong item delivered",
    category: "Order Issue",
    status: "Resolved",
    date: "05 Sep 2025",
  },
];

export default function TicketList() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const getStatusColor = (status: string) => {
    if (status === "Open") return COLORS.open;
    if (status === "In Progress") return COLORS.progress;
    return COLORS.resolved;
  };

  return (
    <View style={styles.root}>
      {/* STATUS BAR */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
      />

      {/* 🔥 SAFE AREA FILL (NO NOTCH GAP) */}
      <View style={[styles.statusFill, { height: insets.top }]} />

      {/* ❤️ TOOLBAR */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={26}
            color="#FFF"
          />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>My Tickets</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* ===== TICKET LIST ===== */}
      <FlatList
        data={TICKETS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              router.push({
                pathname: "/profile/ticketdetails",
                params: item,
              })
            }
          >
            <View style={styles.row}>
              <Text style={styles.subject}>
                {item.subject}
              </Text>

              <View
                style={[
                  styles.statusBadge,
                  {
                    borderColor: getStatusColor(
                      item.status
                    ),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color: getStatusColor(
                        item.status
                      ),
                    },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>

            <Text style={styles.meta}>
              {item.category} • {item.date}
            </Text>

            <Text style={styles.ticketId}>
              Ticket ID: {item.id}
            </Text>
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

  statusFill: {
    backgroundColor: COLORS.primary,
  },

  /* ===== TOOLBAR ===== */
  toolbar: {
    height: 56,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  toolbarTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
  },

  /* ===== LIST ===== */
  list: {
    padding: 16,
  },

  card: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    backgroundColor: COLORS.card,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  subject: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textDark,
    flex: 1,
    paddingRight: 8,
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

  meta: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 6,
  },

  ticketId: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
});
