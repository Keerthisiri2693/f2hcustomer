import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { V } from "../theme/theme"; // 👈 adjust path if needed

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const go = (route: string) => {
    if (pathname !== route) {
      router.push(route);
    }
  };

  return (
    <View style={styles.nav}>
      <NavItem
        icon="home-outline"
        label="Home"
        active={pathname === "/" || pathname === "/dashboard"}
        onPress={() => go("/")}
      />

      <NavItem
        icon="clipboard-list-outline"
        label="Orders"
        active={pathname === "/order/order"}
        onPress={() => go("/order/order")}
      />

      <NavItem
        icon="cart-outline"
        label="Cart"
        active={pathname === "/cart/cart"}
        onPress={() => go("/cart/cart")}
      />

      <NavItem
        icon="account-outline"
        label="Profile"
        active={pathname === "/profile/profile"}
        onPress={() => go("/profile/profile")}
      />
    </View>
  );
}

function NavItem({
  icon,
  label,
  active,
  onPress,
}: {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <MaterialCommunityIcons
        name={icon}
        size={26}
        color={active ? V.PRIMARY : "#9E9E9E"}
      />
      <Text style={[styles.label, active && styles.activeLabel]}>
        {label}
      </Text>

      {/* ❤️ Active Indicator */}
      {active && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    height: 64,
    backgroundColor: V.CARD,
    borderRadius: 22,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    borderWidth: 1,
    borderColor: V.BORDER,

    elevation: 10,
    shadowColor: V.PRIMARY,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 11,
    color: "#9E9E9E",
    marginTop: 2,
  },

  activeLabel: {
    color: V.PRIMARY,
    fontWeight: "700",
  },

  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: V.ACCENT,
    marginTop: 4,
  },
});
