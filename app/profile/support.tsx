import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
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
};

/* ---------------- FAQ DATA ---------------- */

const FAQS = [
  {
    q: "How do I place an order?",
    a: "Select items, add to cart and proceed to checkout.",
  },
  {
    q: "How can I cancel my order?",
    a: "You can cancel from My Orders before it is prepared.",
  },
  {
    q: "When will I get my refund?",
    a: "Refunds are processed within 3–5 working days.",
  },
  {
    q: "Why is my order delayed?",
    a: "Delivery may be delayed due to traffic or restaurant preparation time.",
  },
];

export default function HelpSupport() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <View style={styles.root}>
      {/* STATUS BAR */}
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* 🔥 SAFE AREA COLOR FILL (FIXES NOTCH GAP) */}
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

        <Text style={styles.toolbarTitle}>Help & Support</Text>

        <View style={{ width: 26 }} />
      </View>

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* QUICK HELP */}
        <Text style={styles.sectionTitle}>Quick Help</Text>

        <View style={styles.quickRow}>
          <QuickCard
            icon="clipboard-text-outline"
            label="My Orders"
            onPress={() => router.push("/order/order")}
          />
          <QuickCard
            icon="truck-outline"
            label="Track Order"
            onPress={() => router.push("/order/order")}
          />
          <QuickCard
            icon="cash-refund"
            label="Refund Status"
            onPress={() =>
              router.push("/profile/transactionhistory")
            }
          />
        </View>

        {/* CONTACT */}
        <Text style={styles.sectionTitle}>Contact Us</Text>

        <View style={styles.contactRow}>
          <ContactCard
            icon="phone"
            label="Call"
            onPress={() => Linking.openURL("tel:+919999999999")}
          />
          <ContactCard
            icon="chat"
            label="Chat"
            onPress={() => alert("Open in-app chat")}
          />
          <ContactCard
            icon="whatsapp"
            label="WhatsApp"
            onPress={() =>
              Linking.openURL("https://wa.me/919999999999")
            }
          />
          <ContactCard
            icon="email"
            label="Email"
            onPress={() =>
              Linking.openURL("mailto:support@yourapp.com")
            }
          />
        </View>

        {/* FAQ */}
        <Text style={styles.sectionTitle}>
          Frequently Asked Questions
        </Text>

        {FAQS.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.faqCard}
            activeOpacity={0.9}
            onPress={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          >
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{item.q}</Text>
              <MaterialCommunityIcons
                name={
                  openIndex === index
                    ? "chevron-up"
                    : "chevron-down"
                }
                size={22}
                color={COLORS.primary}
              />
            </View>

            {openIndex === index && (
              <Text style={styles.faqAnswer}>{item.a}</Text>
            )}
          </TouchableOpacity>
        ))}

        {/* SUPPORT TICKET */}
        <TouchableOpacity
          style={styles.ticketBtn}
          onPress={() => router.push("/profile/raiseticket")}
        >
          <Text style={styles.ticketText}>
            Raise a Support Ticket
          </Text>
        </TouchableOpacity>

        {/* LEGAL */}
        <View style={styles.linksRow}>
          <Text style={styles.linkText}>Terms & Conditions</Text>
          <Text style={styles.linkText}>Privacy Policy</Text>
        </View>

        <Text style={styles.appInfo}>App Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

/* ---------------- COMPONENTS ---------------- */

const ContactCard = ({ icon, label, onPress }: any) => (
  <TouchableOpacity style={styles.contactCard} onPress={onPress}>
    <MaterialCommunityIcons
      name={icon}
      size={24}
      color={COLORS.primary}
    />
    <Text style={styles.contactText}>{label}</Text>
  </TouchableOpacity>
);

const QuickCard = ({ icon, label, onPress }: any) => (
  <TouchableOpacity style={styles.quickCard} onPress={onPress}>
    <MaterialCommunityIcons
      name={icon}
      size={26}
      color={COLORS.primary}
    />
    <Text style={styles.quickText}>{label}</Text>
  </TouchableOpacity>
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

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 12,
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  quickCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 14,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },

  quickText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textMuted,
  },

  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  contactCard: {
    width: "48%",
    padding: 14,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    marginBottom: 10,
  },

  contactText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textMuted,
  },

  faqCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },

  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  faqQuestion: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
    flex: 1,
    paddingRight: 8,
  },

  faqAnswer: {
    marginTop: 8,
    fontSize: 13,
    color: COLORS.textMuted,
  },

  ticketBtn: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  ticketText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  linksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  linkText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
  },

  appInfo: {
    textAlign: "center",
    marginTop: 24,
    color: "#999",
    fontSize: 12,
  },
});
