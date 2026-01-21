import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
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
  danger: "#D32F2F",
  white:"#FFF"
};

/* ---------------- MOCK PAYMENT DATA ---------------- */

const INITIAL_PAYMENTS = [
  {
    id: "1",
    type: "UPI",
    label: "Google Pay",
    detail: "keerthana@upi",
    icon: "google-pay",
  },
  {
    id: "2",
    type: "CARD",
    label: "Visa Card",
    detail: "**** **** **** 4321",
    icon: "credit-card-outline",
  },
  {
    id: "3",
    type: "WALLET",
    label: "Paytm Wallet",
    detail: "Connected",
    icon: "wallet-outline",
  },
];

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);

  const removePayment = (id: string) => {
    setPayments((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <View style={styles.root}>
      {/* ✅ PAINT NOTCH AREA */}
      <View style={[styles.notch, { height: insets.top }]} />

      {/* ✅ STATUS BAR */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.primary}
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
            color={COLORS.white}
          />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>
          Payment Methods
        </Text>

        <View style={styles.toolbarSide} />
      </View>

      {/* ➕ ADD PAYMENT */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/addnewpayment")}
        activeOpacity={0.85}
      >
        <MaterialCommunityIcons
          name="plus-circle-outline"
          size={22}
          color={COLORS.primary}
        />
        <Text style={styles.addText}>
          Add New Payment Method
        </Text>
      </TouchableOpacity>

      {/* 💳 PAYMENT LIST */}
      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No payment methods added
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.paymentCard}>
            <View style={styles.paymentLeft}>
              <View style={styles.iconBox}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={22}
                  color={COLORS.primary}
                />
              </View>

              <View>
                <Text style={styles.paymentTitle}>
                  {item.label}
                </Text>
                <Text style={styles.paymentDetail}>
                  {item.detail}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => removePayment(item.id)}
            >
              <MaterialCommunityIcons
                name="delete-outline"
                size={22}
                color={COLORS.danger}
              />
            </TouchableOpacity>
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
    color: COLORS.white,
  },

  /* ===== ADD BUTTON ===== */
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.card,
  },

  addText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.primary,
  },

  /* ===== LIST ===== */
  list: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FCE4EC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  paymentTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textDark,
  },

  paymentDetail: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: COLORS.textMuted,
  },
});
