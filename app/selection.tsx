import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Selection() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Choose your role</Text>

      {/* TOP ROW - 2 Circles */}
      <View style={styles.row}>
        
        {/* CUSTOMER */}
        <TouchableOpacity style={styles.cardWrapper}>
          <LinearGradient
            colors={["#8E2DE2", "#4A00E0"]}  // purple gradient
            style={styles.roleCard}
          >
            <Image
              source={require("../assets/images/customer.png")}
              style={styles.image}
            />
            <Text style={styles.roleText}>Customer</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* VENDOR */}
        <TouchableOpacity style={styles.cardWrapper}>
          <LinearGradient
            colors={["#FF5F6D", "#FFC371"]}  // orange gradient
            style={styles.roleCard}
          >
            <Image
              source={require("../assets/images/vendor.png")}
              style={styles.image}
            />
            <Text style={styles.roleText}>Vendor</Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>

      {/* BOTTOM SINGLE CIRCLE */}
      <TouchableOpacity style={{ marginTop: 20 }}>
        <LinearGradient
          colors={["#36D1DC", "#5B86E5"]} // teal → blue gradient
          style={styles.roleCard}
        >
          <Image
            source={require("../assets/images/rider.png")}
            style={styles.image}
          />
          <Text style={styles.roleText}>Rider</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.buttonText}>Get started →</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F0E9",
    alignItems: "center",
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    marginBottom: 30,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "82%",
  },

  cardWrapper: {
    alignItems: "center",
  },

  roleCard: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    backgroundColor: "transparent",
  },

  roleText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
    fontWeight: "600",
  },

  button: {
    width: "80%",
    backgroundColor: "black",
    paddingVertical: 16,
    borderRadius: 12,
    position: "absolute",
    bottom: 60,
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
