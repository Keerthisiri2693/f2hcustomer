import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { ref, set } from "firebase/database";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { db } from "../firebase/firebaseConfig"; // ✅ CORRECT PATH

/**
 * CREATE DUMMY ORDER + LIVE LOCATION
 */
export default function CreateOrderScreen() {
  const router = useRouter();

  const createOrder = async () => {
    try {
      /* 📍 ASK LOCATION PERMISSION */
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Location permission is needed to create order",
        );
        return;
      }

      /* 📍 GET CURRENT LOCATION */
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const lat = location.coords.latitude;
      const lng = location.coords.longitude;

      const orderId = "order_123"; // 🔑 dummy order id

      /* 📦 CREATE ORDER */
      await set(ref(db, `orders/${orderId}`), {
        orderId: orderId,
        customerId: "user_001",
        riderId: "rider_001",
        status: "ON_THE_WAY",
        totalAmount: 450,
        paymentMode: "COD",
        createdAt: Date.now(),
        lat: lat, // ✅ number
        lng: lng, // ✅ number
      });

      /* 🚴 CREATE LIVE LOCATION NODE */
      await set(ref(db, `live_locations/${orderId}`), {
        lat: lat,
        lng: lng,
        updatedAt: Date.now(),
      });

      Alert.alert("Success", "Order created with live location ✅");

      /* 🔗 GO TO TRACKING */
      router.push({
        pathname: "/OrderTrackingScreen",
        params: { orderId },
      });
    } catch (error) {
      console.error("❌ Error creating order:", error);
      Alert.alert("Error", "Failed to create order");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Dummy Order</Text>

      <Button mode="contained" onPress={createOrder} style={styles.button}>
        Create Order
      </Button>
    </View>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3FAF6",
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1B4332",
  },

  button: {
    width: "80%",
    paddingVertical: 6,
    borderRadius: 12,
  },
});
