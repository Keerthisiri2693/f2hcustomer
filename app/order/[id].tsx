import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

/* ❤️ VALENTINE THEME */
const V = {
  PRIMARY: "#E53935",
  ACCENT: "#EC407A",
  BG: "#FFF1F2",
  CARD: "#FFFFFF",
  BORDER: "#F8BBD0",
  TEXT_DARK: "#7F1D1D",
  TEXT_MUTED: "#9F1239",
};

/* ---------------- MOCK API RESPONSE ---------------- */

const MOCK_ORDER = {
  id: "ORD123",
  restaurant: "SS Hyderabad Biryani",
  address: "Velachery, Chennai",
  items: [
    { name: "Chicken Biryani", qty: 1, price: 220 },
    { name: "Coke", qty: 1, price: 40 },
  ],
  deliveryFee: 30,
  timeline: [
    { title: "Order Placed", time: "10:30 AM", done: true },
    { title: "Preparing Food", time: "10:45 AM", done: true },
    { title: "Out for Delivery", time: "11:10 AM", done: true },
    { title: "Delivered", time: "11:30 AM", done: true },
  ],
};

const BOTTOM_BAR_HEIGHT = 76;
const ANDROID_GESTURE_OFFSET = Platform.OS === "android" ? 24 : 0;

export default function OrderDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const itemTotal = MOCK_ORDER.items.reduce(
    (sum, i) => sum + i.qty * i.price,
    0
  );
  const grandTotal = itemTotal + MOCK_ORDER.deliveryFee;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  /* ---------------- INVOICE DOWNLOAD ---------------- */

  const downloadInvoice = async () => {
    try {
      const invoiceText = `
Invoice - ${MOCK_ORDER.id}

Restaurant: ${MOCK_ORDER.restaurant}
Address: ${MOCK_ORDER.address}

Items:
${MOCK_ORDER.items
  .map((i) => `${i.name} x${i.qty} - ₹${i.price}`)
  .join("\n")}

Item Total: ₹${itemTotal}
Delivery Fee: ₹${MOCK_ORDER.deliveryFee}
------------------------
Grand Total: ₹${grandTotal}
`;

      const fileUri =
        FileSystem.documentDirectory + `Invoice_${MOCK_ORDER.id}.txt`;

      await FileSystem.writeAsStringAsync(fileUri, invoiceText, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("Invoice saved", fileUri);
      }
    } catch {
      Alert.alert("Error", "Unable to generate invoice");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={V.PRIMARY} />

      {/* ❤️ TOOLBAR */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={26}
            color="#FFF"
          />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>Order #{id}</Text>

        <TouchableOpacity onPress={downloadInvoice}>
          <MaterialCommunityIcons
            name="file-download-outline"
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={V.PRIMARY}
          />
        }
        contentContainerStyle={[
          styles.content,
          { paddingBottom: BOTTOM_BAR_HEIGHT + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* RESTAURANT */}
        <View style={styles.card}>
          <Text style={styles.restaurant}>{MOCK_ORDER.restaurant}</Text>
          <Text style={styles.address}>{MOCK_ORDER.address}</Text>
        </View>

        {/* ITEMS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Items</Text>
          {MOCK_ORDER.items.map((item, i) => (
            <View key={i} style={styles.itemRow}>
              <Text>{item.name} ×{item.qty}</Text>
              <Text>₹{item.price}</Text>
            </View>
          ))}
        </View>

        {/* TRACKING */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Tracking</Text>
          {MOCK_ORDER.timeline.map((step, i) => (
            <View key={i} style={styles.timelineRow}>
              <View style={[styles.dot, step.done && styles.dotActive]} />
              <View>
                <Text style={styles.timelineTitle}>{step.title}</Text>
                <Text style={styles.timelineTime}>{step.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* BILL */}
        <View style={styles.card}>
          <View style={styles.billRow}>
            <Text>Item Total</Text>
            <Text>₹{itemTotal}</Text>
          </View>

          <View style={styles.billRow}>
            <Text>Delivery Fee</Text>
            <Text>₹{MOCK_ORDER.deliveryFee}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.billRow}>
            <Text style={styles.total}>Grand Total</Text>
            <Text style={styles.total}>₹{grandTotal}</Text>
          </View>
        </View>
      </ScrollView>

      {/* ❤️ BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.reorderBtn}
          onPress={() => router.push("/cart/cart")}
        >
          <Text style={styles.reorderText}>Reorder</Text>
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
    backgroundColor: V.BG,
  },

  toolbar: {
    height: 56 + STATUSBAR_HEIGHT,
    paddingTop: STATUSBAR_HEIGHT,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: V.PRIMARY,
  },

  toolbarTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
  },

  content: {
    padding: 16,
  },

  card: {
    backgroundColor: V.CARD,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: V.BORDER,
  },

  restaurant: {
    fontSize: 18,
    fontWeight: "800",
    color: V.TEXT_DARK,
  },

  address: {
    fontSize: 14,
    color: V.TEXT_MUTED,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: V.TEXT_DARK,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  timelineRow: {
    flexDirection: "row",
    marginBottom: 14,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: V.BORDER,
    marginTop: 4,
    marginRight: 12,
  },

  dotActive: {
    backgroundColor: V.PRIMARY,
  },

  timelineTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  timelineTime: {
    fontSize: 12,
    color: V.TEXT_MUTED,
  },

  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  divider: {
    height: 1,
    backgroundColor: V.BORDER,
    marginVertical: 8,
  },

  total: {
    fontSize: 16,
    fontWeight: "800",
    color: V.TEXT_DARK,
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: ANDROID_GESTURE_OFFSET,
    padding: 16,
    paddingBottom: 10 + ANDROID_GESTURE_OFFSET,
    backgroundColor: V.CARD,
    borderTopWidth: 1,
    borderTopColor: V.BORDER,
  },

  reorderBtn: {
    height: 52,
    backgroundColor: V.PRIMARY,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  reorderText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
