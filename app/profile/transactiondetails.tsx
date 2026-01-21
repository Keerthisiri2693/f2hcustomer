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
};

export default function TransactionDetails() {
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

      {/* 🔥 SAFE AREA FILL (NO NOTCH GAP) */}
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

        <Text style={styles.toolbarTitle}>Transaction</Text>

        {/* Spacer for center alignment */}
        <View style={{ width: 26 }} />
      </View>

      {/* ===== CONTENT ===== */}
      <View style={styles.card}>
        <Detail label="Transaction ID" value={params.id} />
        <Detail label="Type" value={params.title} />
        <Detail label="Method" value={params.method} />
        <Detail
          label="Date"
          value={new Date(params.date).toLocaleString()}
        />
        <Detail
          label="Amount"
          value={`₹${Math.abs(params.amount as number)}`}
          highlight
        />
      </View>
    </View>
  );
}

/* ---------------- DETAIL ROW ---------------- */

const Detail = ({ label, value, highlight }: any) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, highlight && styles.highlight]}>
      {value}
    </Text>
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

  /* ===== CONTENT ===== */
  card: {
    margin: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    backgroundColor: COLORS.card,
  },

  row: {
    marginBottom: 12,
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
});
