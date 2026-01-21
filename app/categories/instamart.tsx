import { View, Text, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

/* ❤️ VALENTINE THEME */
const V = {
  PRIMARY: "#E53935",
  ACCENT: "#EC407A",
  BG: "#FFF1F2",
  CARD: "#FFFFFF",
  TEXT_DARK: "#7F1D1D",
  TEXT_MUTED: "#9F1239",
};

export default function InstamartComingSoon() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={V.PRIMARY} />

      <View style={styles.container}>
        {/* ❤️ ICON */}
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons
            name="store-clock-outline"
            size={88}
            color={V.PRIMARY}
          />
        </View>

        {/* 🛒 TITLE */}
        <Text style={styles.title}>Instamart</Text>

        {/* ⏳ SUBTITLE */}
        <Text style={styles.subtitle}>
          Coming Soon ❤️
        </Text>

        {/* 📝 DESCRIPTION */}
        <Text style={styles.description}>
          Groceries, snacks, and daily essentials delivered{"\n"}
          in minutes. We’re getting things ready for you!
        </Text>

        {/* 💗 FOOTER BADGE */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            🚀 Launching very soon
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: V.BG,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  iconWrap: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#FFE4E6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: V.TEXT_DARK,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "700",
    color: V.PRIMARY,
    marginTop: 6,
  },

  description: {
    fontSize: 14,
    color: V.TEXT_MUTED,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 22,
  },

  badge: {
    marginTop: 26,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: V.PRIMARY,
    borderRadius: 20,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
