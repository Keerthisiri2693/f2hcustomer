import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

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

/* ---------------- TICKET CATEGORIES ---------------- */

const CATEGORIES = [
  "Order Issue",
  "Payment / Refund",
  "Delivery Delay",
  "Account Issue",
  "Other",
];

export default function RaiseTicket() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [category, setCategory] = useState("Order Issue");
  const [orderId, setOrderId] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const submitTicket = () => {
    if (!subject || !message) {
      alert("Please fill all required fields");
      return;
    }

    alert("Support ticket submitted successfully!");
    router.back();
  };

  return (
    <View style={styles.safe}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.card}
      />

      {/* 🔴 NOTCH-SAFE TOOLBAR */}
      <View
        style={[
          styles.toolbar,
          {
            paddingTop: insets.top,
            height: 56 + insets.top,
          },
        ]}
      >
        {/* BACK */}
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={26}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        {/* TITLE */}
        <Text style={styles.toolbarTitle}>Raise Ticket</Text>

        {/* MY TICKETS */}
        <TouchableOpacity
          style={styles.ticketListBtn}
          onPress={() => router.push("/profile/ticketlist")}
        >
          <MaterialCommunityIcons
            name="clipboard-list-outline"
            size={22}
            color={COLORS.primary}
          />
          <Text style={styles.ticketListText}>My Tickets</Text>
        </TouchableOpacity>
      </View>

      {/* ===== CONTENT ===== */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* CATEGORY */}
        <Text style={styles.label}>Issue Category</Text>
        <View style={styles.categoryRow}>
          {CATEGORIES.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.categoryChip,
                category === item && styles.categoryActive,
              ]}
              onPress={() => setCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item &&
                    styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ORDER ID */}
        <Text style={styles.label}>Order ID (optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter order ID"
          placeholderTextColor={COLORS.textMuted}
          value={orderId}
          onChangeText={setOrderId}
        />

        {/* SUBJECT */}
        <Text style={styles.label}>Subject *</Text>
        <TextInput
          style={styles.input}
          placeholder="Brief subject"
          placeholderTextColor={COLORS.textMuted}
          value={subject}
          onChangeText={setSubject}
        />

        {/* MESSAGE */}
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your issue in detail"
          placeholderTextColor={COLORS.textMuted}
          value={message}
          onChangeText={setMessage}
          multiline
        />

        {/* ATTACHMENT */}
        <TouchableOpacity style={styles.attachBtn}>
          <MaterialCommunityIcons
            name="paperclip"
            size={20}
            color={COLORS.primary}
          />
          <Text style={styles.attachText}>
            Attach Screenshot
          </Text>
        </TouchableOpacity>

        {/* SUBMIT */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={submitTicket}
        >
          <Text style={styles.submitText}>
            Submit Ticket
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* ===== TOOLBAR ===== */
  toolbar: {
    backgroundColor: COLORS.card,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  toolbarTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textDark,
  },

  ticketListBtn: {
    flexDirection: "row",
    alignItems: "center",
  },

  ticketListText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.primary,
  },

  /* ===== CONTENT ===== */
  content: {
    padding: 16,
    paddingBottom: 40,
  },

  label: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 6,
    marginTop: 16,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: COLORS.card,
    fontSize: 15,
    color: COLORS.textDark,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  /* CATEGORY */
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },

  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: COLORS.card,
  },

  categoryActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  categoryText: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: "700",
  },

  categoryTextActive: {
    color: "#FFFFFF",
  },

  /* ATTACH */
  attachBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  attachText: {
    marginLeft: 8,
    color: COLORS.primary,
    fontWeight: "700",
  },

  /* SUBMIT */
  submitBtn: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  submitText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
