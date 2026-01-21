import React from "react";
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
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/* ---------------- VALENTINE THEME ---------------- */

const PRIMARY = "#E63946"; // Valentine Red
const DARK = "#7F1D1D";
const BG = "#FFF1F2";
const CARD = "#FFFFFF";
const BORDER = "#FADADD";
const MUTED = "#9F1239";

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      {/* ✅ NOTCH COLOR FIX */}
      <View style={[styles.notch, { height: insets.top }]} />

      <StatusBar barStyle="light-content" backgroundColor={PRIMARY} />

      {/* TOOLBAR */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={26}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>Profile</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Keerthana</Text>
          <Text style={styles.phone}>+91 9XXXX XXXXX</Text>
          <Text style={styles.email}>keerthana@gmail.com</Text>
        </View>

        {/* OPTIONS */}
        <View style={styles.card}>
          <ProfileItem
            icon="account-edit"
            label="Edit Profile"
            onPress={() => router.push("/profile/edit")}
          />

          <ProfileItem
            icon="shopping-outline"
            label="My Orders"
            onPress={() => router.push("/order/order")}
          />

          <ProfileItem
            icon="map-marker-outline"
            label="Saved Addresses"
            onPress={() => router.push("/profile/savedAddress")}
          />

          <ProfileItem
            icon="credit-card-outline"
            label="Payment Methods"
            onPress={() => router.push("/profile/payments")}
          />

          <ProfileItem
            icon="credit-card-outline"
            label="Transaction History"
            onPress={() => router.push("/profile/transactionhistory")}
          />

          <ProfileItem
            icon="bell-outline"
            label="Notifications"
            onPress={() => router.push("/profile/notifications")}
          />

          <ProfileItem
            icon="help-circle-outline"
            label="Help & Support"
            onPress={() => router.push("/profile/support")}
          />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
          <MaterialCommunityIcons name="logout" size={20} color={PRIMARY} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* ---------------- PROFILE ITEM ---------------- */

const ProfileItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.itemLeft}>
      <MaterialCommunityIcons name={icon} size={22} color={PRIMARY} />
      <Text style={styles.itemText}>{label}</Text>
    </View>

    <MaterialCommunityIcons
      name="chevron-right"
      size={22}
      color={MUTED}
    />
  </TouchableOpacity>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },

  /* 🔥 FILLS NOTCH / STATUS BAR */
  notch: {
    backgroundColor: PRIMARY,
  },

  toolbar: {
    height: 56,
    backgroundColor: PRIMARY,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  toolbarTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  header: {
    alignItems: "center",
    paddingVertical: 32,
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: PRIMARY,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: DARK,
  },

  phone: {
    color: MUTED,
    marginTop: 4,
  },

  email: {
    color: MUTED,
    marginTop: 2,
  },

  card: {
    backgroundColor: CARD,
    margin: 16,
    borderRadius: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: BORDER,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemText: {
    marginLeft: 14,
    fontSize: 15,
    color: DARK,
  },

  logoutBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 15,
    borderRadius: 14,
    backgroundColor: "#FFE4E6",
  },

  logoutText: {
    marginLeft: 8,
    color: PRIMARY,
    fontWeight: "700",
  },
});
