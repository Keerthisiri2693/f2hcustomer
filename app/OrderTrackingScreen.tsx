import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import { off, onValue, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, {
  AnimatedRegion,
  Marker,
  Polyline,
} from "react-native-maps";
import { db } from "../../F2H/app/firebase/firebaseConfig";

const GOOGLE_API_KEY = "AIzaSyBDkpmL3tKC-rtjFo7V4c4bHusK52hpcBE";

export default function TrackingScreen() {
  const params = useLocalSearchParams();
  const orderId =
    typeof params.orderNo === "string" ? params.orderNo : undefined;

  const mapRef = useRef<MapView>(null);

  const riderMarker = useRef(
    new AnimatedRegion({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  ).current;

  const [customerLocation, setCustomerLocation] = useState<any>(null);
  const [routeCoords, setRouteCoords] = useState<any[]>([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [orderStatus, setOrderStatus] = useState("ON_THE_WAY");
  const [loading, setLoading] = useState(true);

  /* 🧍 CUSTOMER LOCATION */
  const getCustomerLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    setCustomerLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

  /* 🗺️ FETCH ROUTE + ETA */
  const fetchRoute = async (
    riderLat: number,
    riderLng: number,
    custLat: number,
    custLng: number
  ) => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${riderLat},${riderLng}&destination=${custLat},${custLng}&key=${GOOGLE_API_KEY}`;

    const res = await fetch(url);
    const json = await res.json();

    if (json.routes.length) {
      const points = decodePolyline(
        json.routes[0].overview_polyline.points
      );
      setRouteCoords(points);

      setDistance(json.routes[0].legs[0].distance.text);
      setDuration(json.routes[0].legs[0].duration.text);
    }
  };

  /* 🚴 LIVE TRACKING */
  useEffect(() => {
    if (!orderId) return;

    getCustomerLocation();

    const liveRef = ref(db, `live_locations/${orderId}`);
    const orderRef = ref(db, `orders/${orderId}`);

    const liveUnsub = onValue(liveRef, (snap) => {
      if (!snap.exists() || !customerLocation) return;

      const { lat, lng } = snap.val();

      riderMarker.timing({
        latitude: lat,
        longitude: lng,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      fetchRoute(
        lat,
        lng,
        customerLocation.latitude,
        customerLocation.longitude
      );

      mapRef.current?.animateToRegion(
        {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        500
      );

      setLoading(false);
    });

    const orderUnsub = onValue(orderRef, (snap) => {
      if (snap.exists()) {
        setOrderStatus(snap.val().status);
      }
    });

    return () => {
      off(liveRef);
      off(orderRef);
      liveUnsub?.();
      orderUnsub?.();
    };
  }, [orderId, customerLocation]);

  /* ⛔ STOP TRACKING */
  if (orderStatus === "DELIVERED") {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.done}>✅ Order Delivered</Text>
      </SafeAreaView>
    );
  }

  if (loading || !customerLocation) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Tracking rider...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView ref={mapRef} style={{ flex: 1 }}>
        {/* 🚴 RIDER (ANIMATED) */}
        <Marker.Animated coordinate={riderMarker} />

        {/* 🧍 CUSTOMER */}
        <Marker
          coordinate={customerLocation}
          pinColor="green"
          title="You"
        />

        {/* 🛣️ ROUTE */}
        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeWidth={5}
            strokeColor="#2E7D32"
          />
        )}
      </MapView>

      {/* 📊 ETA CARD */}
      <View style={styles.infoCard}>
        <Text style={styles.title}>
          {distance} • {duration}
        </Text>
        <Text>Rider is on the way 🚴</Text>
      </View>
    </SafeAreaView>
  );
}

/* 🔑 POLYLINE DECODER */
function decodePolyline(encoded: string) {
  let points = [];
  let index = 0,
    lat = 0,
    lng = 0;

  while (index < encoded.length) {
    let b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;

    points.push({
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    });
  }
  return points;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoCard: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    elevation: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  done: {
    fontSize: 22,
    fontWeight: "700",
    color: "green",
  },
});
