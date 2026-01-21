import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
  success: "#2E7D32",
};

export default function TicketDetails() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      {/* STATUS BAR */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
      />

      {/* 🔥 SAFE AREA FILL (FIXES NOTCH GAP) */}
      <View
        style={[
          styles.statusFill,
          { height: insets.top },
        ]}
      />

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
          Ticket Details
        </Text>

        <View style={{ width: 26 }} />
      </View>

      {/* ===== DETAILS ===== */}
      <View style={styles.card}>
        <Detail label="Ticket ID" value={params.id} />
        <Detail label="Subject" value={params.subject} />
        <Detail label="Category" value={params.category} />
        <Detail label="Created On" value={params.date} />
        <Detail
          label="Status"
          value={params.status}
          highlight
        />
      </View>

      {/* ===== STATUS TIMELINE ===== */}
      <View style={styles.card}>
        <Text style={styles.section}>
          Status Timeline
        </Text>

        <Timeline title="Ticket Created" done />
        <Timeline
          title="Support Reviewing"
          done={params.status !== "Open"}
        />
        <Timeline
          title="Resolved"
          done={params.status === "Resolved"}
        />
      </View>
    </View>
  );
}

/* ---------------- DETAIL ROW ---------------- */

const Detail = ({ label, value, highlight }: any) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text
      style={[
        styles.value,
        highlight && styles.highlight,
      ]}
    >
      {value}
    </Text>
  </View>
);

/* ---------------- TIMELINE ---------------- */

const Timeline = ({ title, done }: any) => (
  <View style={styles.timelineRow}>
    <View
      style={[
        styles.dot,
        {
          backgroundColor: done
            ? COLORS.primary
            : COLORS.border,
        },
      ]}
    />
    <Text style={styles.timelineText}>{title}</Text>
  </View>
);

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

  /* ===== CARDS ===== */
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },

  section: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: COLORS.textDark,
  },

  row: {
    marginBottom: 10,
  },

  label: {
    fontSize: 13,
    color: COLORS.textMuted,
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 2,
    color: COLORS.textDark,
  },

  highlight: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  /* ===== TIMELINE ===== */
  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },

  timelineText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
  },
});
