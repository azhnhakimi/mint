import {
  formatCategory,
  getCategoryColor,
  getCategoryIcon,
} from "@/constants/categories";
import { transaction } from "@/types/transaction";
import { useAuth } from "@clerk/clerk-expo";
import { MaterialIcons } from "@expo/vector-icons";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PieChart } from "react-native-gifted-charts";

import { getTransactionsByMonth } from "@/src/api/transactions";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const YEARS = Array.from({ length: 31 }, (_, i) => currentYear - 15 + i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i); // 0-11

export default function AnalyticsArchives() {
  const { userId } = useAuth();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [transactions, setTransactions] = useState<transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // bottom sheet refs
  const yearSheetRef = useRef<BottomSheetModal>(null);
  const monthSheetRef = useRef<BottomSheetModal>(null);

  const openYearSheet = () => yearSheetRef.current?.present();
  const openMonthSheet = () => monthSheetRef.current?.present();

  // TOTAL AMOUNT
  const totalAmount = useMemo(() => {
    return transactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
  }, [transactions]);

  const fetchTransactions = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    const { data, error } = await getTransactionsByMonth(
      userId,
      selectedYear,
      selectedMonth + 1
    );

    if (error) {
      setError(error.message);
      setTransactions([]);
    } else {
      setTransactions(data || []);
    }
    setLoading(false);
  }, [userId, selectedYear, selectedMonth]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [fetchTransactions])
  );

  // handlers when user selects year/month
  const onSelectYear = (year: number) => {
    setSelectedYear(year);
    yearSheetRef.current?.dismiss();
    fetchTransactions();
  };

  const onSelectMonth = (month: number) => {
    setSelectedMonth(month);
    monthSheetRef.current?.dismiss();
    fetchTransactions();
  };

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};

    transactions.forEach((t) => {
      if (!totals[t.category]) totals[t.category] = 0;
      totals[t.category] += parseFloat(t.amount);
    });

    return Object.entries(totals)
      .map(([category, value]) => ({ category, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const pieChartData = useMemo(
    () =>
      categoryTotals.map((item) => ({
        value: item.value,
        color: getCategoryColor(item.category),
      })),
    [categoryTotals]
  );

  return (
    <BottomSheetModalProvider>
      <ScrollView
        style={{
          padding: 10,
          flex: 1,
          paddingBottom: 24,
          backgroundColor: "#101D22",
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* BUTTONS */}
        <View
          style={[
            styles.row,
            {
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 8,
              marginTop: 16,
            },
          ]}
        >
          <Text
            className="text-xl font-semibold flex-1"
            style={{ color: "#ffffff" }}
          >
            Past Months
          </Text>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor: "#0F172A",
                borderWidth: 1,
                borderColor: "#1E2A3C",
              },
            ]}
            onPress={openYearSheet}
          >
            <Text style={styles.btnText}>{selectedYear}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor: "#0F172A",
                borderWidth: 1,
                borderColor: "#1E2A3C",
              },
            ]}
            onPress={openMonthSheet}
          >
            <Text style={styles.btnText}>
              {format(new Date(selectedYear, selectedMonth), "MMMM")}
            </Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* DISPLAY TOTAL */}
        <View
          style={[
            styles.totalContainer,
            {
              backgroundColor: "#0F172A",
              borderWidth: 1,
              borderColor: "#1E2A3C",
              padding: 12,
            },
          ]}
          className="rounded-lg"
        >
          <Text style={styles.totalLabel}>
            {format(new Date(selectedYear, selectedMonth), "MMMM")}{" "}
            {selectedYear} Total Spending
          </Text>
          <Text style={styles.totalValue}>RM {totalAmount.toFixed(2)}</Text>
        </View>

        <View
          className="flex justify-center items-center"
          style={{ marginVertical: 20 }}
        >
          {pieChartData.length > 0 ? (
            <PieChart data={pieChartData} radius={80} />
          ) : (
            <View
              className="flex justify-center items-center"
              style={{ padding: 32 }}
            >
              <Text className="" style={{ color: "#8796A9" }}>
                No transactions data to display...
              </Text>
            </View>
          )}
        </View>

        <View
          className="flex flex-col"
          style={{ gap: 10, marginVertical: 16, marginBottom: 24 }}
        >
          {categoryTotals.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{ backgroundColor: getCategoryColor(item.category) }}
                className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-200"
              >
                <MaterialIcons
                  name={getCategoryIcon(item.category)}
                  size={22}
                  color={item.category === "personalCare" ? "black" : "white"}
                />
              </View>
              <Text className="flex-1 text-left text-lg font-semibold text-white">
                {formatCategory(item.category)}
              </Text>
              <Text style={{ fontSize: 14, color: "#8796A9" }}>
                RM {item.value.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* YEAR SELECTOR */}
        <BottomSheetModal ref={yearSheetRef} snapPoints={["50%"]}>
          <BottomSheetFlatList
            data={YEARS}
            keyExtractor={(item: number) => item.toString()}
            renderItem={({ item }: { item: number }) => (
              <TouchableOpacity
                style={styles.sheetItem}
                onPress={() => onSelectYear(item)}
              >
                <Text style={styles.sheetText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </BottomSheetModal>

        {/* MONTH SELECTOR */}
        <BottomSheetModal ref={monthSheetRef} snapPoints={["50%"]}>
          <BottomSheetFlatList
            data={MONTHS}
            keyExtractor={(item: number) => item.toString()}
            renderItem={({ item }: { item: number }) => (
              <TouchableOpacity
                style={styles.sheetItem}
                onPress={() => onSelectMonth(item)}
              >
                <Text style={styles.sheetText}>
                  {format(new Date(selectedYear, item), "MMMM")}
                </Text>
              </TouchableOpacity>
            )}
          />
        </BottomSheetModal>
      </ScrollView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  btn: {
    backgroundColor: "#212122",
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    gap: 2,
  },
  btnText: { fontSize: 12, fontWeight: "600", color: "#ffffff" },

  totalContainer: { marginTop: 30 },
  totalLabel: { fontSize: 14, color: "#8796A9" },
  totalValue: { fontSize: 24, fontWeight: "700", marginTop: 2, color: "#fff" },

  sheetItem: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  sheetText: { fontSize: 18 },
});
