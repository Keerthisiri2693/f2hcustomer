import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  Dimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, parseISO } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { BarChart } from "react-native-chart-kit";

const API_BASE_URL = "https://api.mamisum.com";
const SCREEN_WIDTH = Dimensions.get("window").width;
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";





/* ================= COLORS ================= */
const COLORS = {
  primary: "#128321",
  bg: "#F3FAF6",
  card: "#FFFFFF",
  textDark: "#0F2A1D",
  textMuted: "#6B8F7A",
  warning: "#F59E0B",
  success: "#22C55E",
  danger: "#DC2626",
  border: "#E5E7EB",
};

/* ================= TYPES ================= */

type SalesData = {
  id: string;
  orderNo: string;
  createdAt: string;
  totalBillAmount: string;
  customerName?: string;
};

type Shop = {
  id: string;
  shopName: string;
};

/* ================= SCREEN ================= */

export default function SalesReportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [token, setToken] = useState<string | null>(null);
  const [shopId, setShopId] = useState<string | null>(null);

  const [shops, setShops] = useState<Shop[]>([]);
  const [showShopModal, setShowShopModal] = useState(false);

  const [sales, setSales] = useState<SalesData[]>([]);
  const [allSales, setAllSales] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(false);

  /* 🔎 FILTER STATE */
  const [filterModal, setFilterModal] = useState(false);
  const [filterType, setFilterType] =
    useState<"date" | "month" | "year" | null>(null);
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  /* ================= INIT ================= */

  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem("token");
      const s = await AsyncStorage.getItem("shopId");

      if (!t || !s) {
        Alert.alert("Session expired", "Please login again");
        return;
      }

      setToken(t);
      setShopId(s);
      fetchShops(t);
    })();
  }, []);

  /* ================= FETCH SHOPS ================= */

  const fetchShops = async (token: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/ShopProfile/my-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setShops(Array.isArray(data) ? data : []);
    } catch {
      Alert.alert("Failed to load shops");
    }
  };

  /* ================= LOAD SALES ================= */

  useEffect(() => {
    if (token && shopId) loadSalesReport();
  }, [token, shopId]);

  const loadSalesReport = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/api/Order/shop-orders/${shopId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();
      const list = Array.isArray(data) ? data : [];

      setAllSales(list);
      setSales(list);
    } catch {
      Alert.alert("Failed to load sales report");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER LOGIC ================= */

  const applyFilter = (
    date: Date,
    type: "date" | "month" | "year"
  ) => {
    let filtered: SalesData[] = [];

    if (type === "date") {
      const d = format(date, "yyyy-MM-dd");
      filtered = allSales.filter(s =>
        s.createdAt.startsWith(d)
      );
    }

    if (type === "month") {
      filtered = allSales.filter(s => {
        const d = parseISO(s.createdAt);
        return (
          d.getMonth() === date.getMonth() &&
          d.getFullYear() === date.getFullYear()
        );
      });
    }

    if (type === "year") {
      filtered = allSales.filter(
        s => parseISO(s.createdAt).getFullYear() === date.getFullYear()
      );
    }

    setSales(filtered);
  };

  /* ================= CHART DATA ================= */

  const monthlyChartData = useMemo(() => {
    const map: Record<string, number> = {};

    sales.forEach(s => {
      const key = format(parseISO(s.createdAt), "MMM yyyy");
      map[key] = (map[key] || 0) + Number(s.totalBillAmount || 0);
    });

    return {
      labels: Object.keys(map),
      datasets: [{ data: Object.values(map) }],
    };
  }, [sales]);

  const totalAmount = sales.reduce(
    (sum, s) => sum + Number(s.totalBillAmount || 0),
    0
  );


const exportCSV = async () => {
  try {
    if (!sales.length) {
      Alert.alert("No data to export");
      return;
    }

    const csv =
      "Order No,Date,Customer,Amount\n" +
      sales
        .map(
          s =>
            `${s.orderNo},${format(
              parseISO(s.createdAt),
              "dd-MM-yyyy"
            )},${s.customerName || "Guest"},${s.totalBillAmount}`
        )
        .join("\n");

    const fileUri =
      FileSystem.documentDirectory + "sales_report.csv";

    await FileSystem.writeAsStringAsync(fileUri, csv, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    await Sharing.shareAsync(fileUri);
  } catch (err) {
    console.error(err);
    Alert.alert("Export failed");
  }
};



const exportPDF = async () => {
  if (!sales.length) {
    Alert.alert("No data", "Nothing to export");
    return;
  }

  const html = `
    <h2>Sales Report</h2>
    <table border="1" cellspacing="0" cellpadding="6">
      <tr>
        <th>Order</th>
        <th>Date</th>
        <th>Customer</th>
        <th>Amount</th>
      </tr>
      ${sales
        .map(
          s => `
        <tr>
          <td>${s.orderNo}</td>
          <td>${format(parseISO(s.createdAt), "dd MMM yyyy")}</td>
          <td>${s.customerName || "Guest"}</td>
          <td>₹${s.totalBillAmount}</td>
        </tr>`
        )
        .join("")}
    </table>
  `;

  await Print.printAsync({ html });
};


  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <StatusBar style="light" backgroundColor={COLORS.primary} />

      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>Sales Report</Text>
          <Text style={styles.headerSub}>Business Analytics</Text>
        </View>

        <TouchableOpacity onPress={() => setShowShopModal(true)}>
          <MaterialCommunityIcons name="storefront-outline" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* KPI */}
      <View style={styles.kpiRow}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Orders</Text>
          <Text style={styles.kpiValue}>{sales.length}</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Revenue</Text>
          <Text style={styles.kpiValue}>₹{totalAmount}</Text>
        </View>
      </View>

      {/* FILTER */}
      <View style={styles.filterBar}>
        <TouchableOpacity
          style={styles.filterChip}
          onPress={() => setFilterModal(true)}
        >
          <MaterialCommunityIcons name="calendar-range" size={16} color={COLORS.primary} />
          <Text style={styles.filterChipText}>
            {filterType ? filterType.toUpperCase() : "FILTER"}
          </Text>
        </TouchableOpacity>

        {pickedDate && filterType && (
          <Text style={styles.filterRange}>
            {filterType === "year"
              ? format(pickedDate, "yyyy")
              : filterType === "month"
              ? format(pickedDate, "MMM yyyy")
              : format(pickedDate, "dd MMM yyyy")}
          </Text>
        )}
      </View>

    {/* CHART */}
{monthlyChartData.labels.length > 0 && (
  <View style={styles.chartCard}>
    <View style={styles.chartHeader}>
      <Text style={styles.sectionTitle}>Revenue Overview</Text>
      <Text style={styles.sectionSub}>Month wise earnings</Text>
    </View>

    <BarChart
      data={monthlyChartData}
      width={SCREEN_WIDTH - 64}
      height={220}
      fromZero
      withInnerLines={false}
      showValuesOnTopOfBars={false}
      yAxisLabel="₹"
      yAxisSuffix="" 
      chartConfig={{
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientTo: "#FFFFFF",
        decimalPlaces: 0,
        color: () => COLORS.primary,
        labelColor: () => COLORS.textMuted,
        barPercentage: 0.45,
        propsForBackgroundLines: { strokeDasharray: "" },
      }}
      style={{ marginTop: 12, borderRadius: 16 }}
    />
  </View>
)}



      {/* LIST */}
      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={sales}
          keyExtractor={i => i.id}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View>
                <Text style={styles.orderNo}>#{item.orderNo}</Text>
                <Text style={styles.orderDate}>
                  {format(parseISO(item.createdAt), "dd MMM yyyy")}
                </Text>
              </View>
              <View>
                <Text style={styles.orderAmount}>₹{item.totalBillAmount}</Text>
               
              </View>
            </View>
          )}
        />
      )}
              {/* EXPORT ACTIONS */}
<View style={styles.exportRow}>
  <TouchableOpacity
    style={[styles.exportBtn, styles.csvBtn]}
    onPress={exportCSV}
    activeOpacity={0.8}
  >
    <MaterialCommunityIcons name="file-delimited" size={20} color="#065F46" />
    <Text style={styles.exportText}>Export CSV</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.exportBtn, styles.pdfBtn]}
    onPress={exportPDF}
    activeOpacity={0.8}
  >
    <MaterialCommunityIcons name="file-pdf-box" size={20} color="#7C2D12" />
    <Text style={styles.exportText}>Export PDF</Text>
  </TouchableOpacity>
</View>

      {/* FILTER MODAL */}
      <Modal visible={filterModal} transparent>
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Filter By</Text>

            {["date", "month", "year"].map(t => (
              <TouchableOpacity
                key={t}
                style={styles.filterItem}
                onPress={() => {
                  setFilterType(t as any);
                  setShowPicker(true);
                  setFilterModal(false);
                }}
              >
                <Text>{t.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => {
                setFilterType(null);
                setPickedDate(null);
                setSales(allSales);
                setFilterModal(false);
              }}
            >
              <Text style={{ color: "red", marginTop: 10 }}>RESET</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {showPicker && (
        <DateTimePicker
          value={pickedDate || new Date()}
          mode="date"
          onChange={(_, date) => {
            setShowPicker(false);
            if (!date || !filterType) return;
            setPickedDate(date);
            applyFilter(date, filterType);
          }}
        />
      )}
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "800" },
  headerSub: { color: "#D1FAE5", fontSize: 12 },

  kpiRow: { flexDirection: "row", gap: 12, padding: 16 },
  kpiCard: { flex: 1, backgroundColor: "#FFF", borderRadius: 16, padding: 16 },
  kpiLabel: { fontSize: 12, color: COLORS.textMuted },
  kpiValue: { fontSize: 22, fontWeight: "800", color: COLORS.primary },

  filterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF7F0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  filterChipText: { color: COLORS.primary, fontWeight: "700" },
  filterRange: { fontSize: 12, color: COLORS.muted },

 
  

  orderCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderNo: { fontWeight: "800" },
  orderDate: { fontSize: 12, color: COLORS.muted },
  orderAmount: { fontWeight: "800", fontSize: 16, color: COLORS.primary },
  orderCustomer: { fontSize: 12, color: COLORS.muted, textAlign: "right" },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#FFF",
    width: "80%",
    borderRadius: 12,
    padding: 16,
  },
  popupTitle: { fontWeight: "800", marginBottom: 10 },
  filterItem: { paddingVertical: 12 },

  chartCard: {
  backgroundColor: "#FFF",
  marginHorizontal: 16,
  marginTop: 16,
  padding: 16,
  borderRadius: 18,
  elevation: 4,
},

chartHeader: {
  marginBottom: 8,
},

sectionTitle: {
  fontSize: 15,
  fontWeight: "800",
  color: COLORS.textDark,
},

sectionSub: {
  fontSize: 12,
  color: COLORS.textMuted,
  marginTop: 2,
},

exportRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  marginTop: 12,
  marginBottom: 8,
},

exportBtn: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 12,
  borderRadius: 14,
  gap: 8,
  elevation: 2,
},

csvBtn: {
  backgroundColor: "#ECFDF5", // light green
  marginRight: 8,
},

pdfBtn: {
  backgroundColor: "#FFF7ED", // light orange
  marginLeft: 8,
},

exportText: {
  fontWeight: "800",
  fontSize: 14,
  color: "#0F172A",
},


});
