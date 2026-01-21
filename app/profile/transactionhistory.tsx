import React, { useState, useMemo } from "react";
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
  credit: "#2E7D32",
  debit: "#D32F2F",
};

/* ---------------- MOCK API DATA ---------------- */

const TRANSACTIONS = [
  {
    id: "TXN001",
    title: "Order Payment",
    date: "2025-09-12T11:30:00",
    amount: -260,
    method: "UPI",
  },
  {
    id: "TXN002",
    title: "Wallet Top-up",
    date: "2025-09-10T21:10:00",
    amount: 500,
    method: "Card",
  },
  {
    id: "TXN003",
    title: "Order Refund",
    date: "2025-08-28T14:45:00",
    amount: 180,
    method: "Wallet",
  },
];

const FILTERS = ["All", "Last 7 Days", "Today"];

export default function TransactionHistory() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState("All");

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredData = useMemo(() => {
    const now = new Date();

    return TRANSACTIONS.filter((txn) => {
      const txnDate = new Date(txn.date);

      if (filter === "Today") {
        return txnDate.toDateString() === now.toDateString();
      }

      if (filter === "Last 7 Days") {
        const diff =
          (now.getTime() - txnDate.getTime()) /
          (1000 * 60 * 60 * 24);
        return diff <= 7;
      }

      return true;
    });
  }, [filter]);

  /* ---------------- GROUP BY MONTH ---------------- */
  const grouped = useMemo(() => {
    const groups: Record<string, any[]> = {};
    filteredData.forEach((txn) => {
      const month = new Date(txn.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!groups[month]) groups[month] = [];
      groups[month].push(txn);
    });
    return groups;
  }, [filteredData]);

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

        <Text style={styles.toolbarTitle}>
          Transaction History
        </Text>

        <View style={{ width: 26 }} />
      </View>

      {/* ===== FILTER ===== */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterChip,
              filter === f && styles.filterActive,
            ]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f && styles.filterTextActive,
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ===== TRANSACTION LIST ===== */}
      <FlatList
        data={Object.keys(grouped)}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item: month }) => (
          <View>
            <Text style={styles.month}>{month}</Text>

            {grouped[month].map((txn) => {
              const credit = txn.amount > 0;

              return (
                <TouchableOpacity
                  key={txn.id}
                  style={styles.card}
                  activeOpacity={0.8}
                  onPress={() =>
                    router.push({
                      pathname:
                        "/profile/transactiondetails",
                      params: txn,
                    })
                  }
                >
                  <View style={styles.row}>
                    <MaterialCommunityIcons
                      name={
                        credit ? "arrow-down" : "arrow-up"
                      }
                      size={20}
                      color={
                        credit
                          ? COLORS.credit
                          : COLORS.debit
                      }
                    />

                    <View
                      style={{ flex: 1, marginLeft: 12 }}
                    >
                      <Text style={styles.title}>
                        {txn.title}
                      </Text>
                      <Text style={styles.date}>
                        {new Date(
                          txn.date
                        ).toLocaleString()}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.amount,
                        {
                          color: credit
                            ? COLORS.credit
                            : COLORS.debit,
                        },
                      ]}
                    >
                      {credit ? "+" : "-"}₹
                      {Math.abs(txn.amount)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
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

  /* ===== FILTER ===== */
  filterRow: {
    flexDirection: "row",
    padding: 12,
  },

  filterChip: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: COLORS.card,
  },

  filterActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  filterText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: "600",
  },

  filterTextActive: {
    color: "#FFF",
  },

  /* ===== LIST ===== */
  list: {
    padding: 16,
  },

  month: {
    fontSize: 15,
    fontWeight: "700",
    marginVertical: 10,
    color: COLORS.textDark,
  },

  card: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
  },

  date: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  amount: {
    fontSize: 15,
    fontWeight: "700",
  },
});
