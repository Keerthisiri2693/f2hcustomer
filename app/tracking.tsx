import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { ref, onValue, off } from "firebase/database";
import { useLocalSearchParams } from "expo-router";

import { db } from "../../F2H/app/firebase/firebaseConfig"; // ✅ FIXED PATH

/* 🌿 THEME */
const COLORS = {
  PRIMARY: "#2E7D32",
  BG: "#F3FAF6",
  CARD: "#FFFFFF",
  TEXT: "#1B4332",
  MUTED: "#7C9A8E",
};

export default function TrackingScreen() {
  const params = useLocalSearchParams();
  const orderId =
    typeof params.orderId === "string" ? params.orderId : undefined;

  const [riderLocation, setRiderLocation] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /* 📍 GET CUSTOMER LOCATION */
  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Location permission is needed to track your order"
      );
      setLoading(false);
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  /* 🚴 LISTEN RIDER LOCATION */
  useEffect(() => {
    if (!orderId) {
      Alert.alert("Error", "Order ID not found");
      setLoading(false);
      return;
    }

    getUserLocation();

    const locationRef = ref(db, `live_locations/${orderId}`);

    onValue(locationRef, (snapshot) => {
      if (snapshot.exists()) {
        setRiderLocation(snapshot.val());
      }
      setLoading(false);
    });

    return () => off(locationRef);
  }, [orderId]);

  /* ⏳ LOADING */
  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        <Text style={styles.loadingText}>Tracking rider...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude:
            riderLocation?.lat ||
            userLocation?.latitude ||
            13.0827,
          longitude:
            riderLocation?.lng ||
            userLocation?.longitude ||
            80.2707,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* 🚴 RIDER */}
        {riderLocation && (
          <Marker
            coordinate={{
              latitude: riderLocation.lat,
              longitude: riderLocation.lng,
            }}
            title="Delivery Partner"
            description="On the way 🚴"
          />
        )}

        {/* 🧍 CUSTOMER */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="You"
            pinColor="green"
          />
        )}
      </MapView>

      {/* 🧾 INFO CARD */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Order is on the way</Text>
        <Text style={styles.infoSub}>
          Live rider tracking enabled 📍
        </Text>
      </View>
    </SafeAreaView>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.BG,
  },

  map: {
    flex: 1,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.BG,
  },

  loadingText: {
    marginTop: 12,
    color: COLORS.MUTED,
    fontSize: 14,
  },

  infoCard: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: COLORS.CARD,
    borderRadius: 16,
    padding: 16,
    elevation: 6,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.TEXT,
  },

  infoSub: {
    fontSize: 13,
    color: COLORS.MUTED,
    marginTop: 4,
  },
});
