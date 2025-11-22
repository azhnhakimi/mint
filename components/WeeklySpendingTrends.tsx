// components/WeeklySpendingTrends.tsx
import { transaction } from "@/types/transaction";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { addDays, format, startOfWeek } from "date-fns";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";

type WeeklySpendingTrendsProps = {
  transactions: transaction[];
};

const { width: screenWidth } = Dimensions.get("window");

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WeeklySpendingTrends = ({ transactions }: WeeklySpendingTrendsProps) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const goPreviousWeek = () =>
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  const goNextWeek = () => setCurrentWeekStart(addDays(currentWeekStart, 7));
  const goThisWeek = () =>
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const weeklyData = useMemo(() => {
    const weekStart = currentWeekStart;

    const data = daysOfWeek.map((_, index) => {
      const dayDate = addDays(weekStart, index);
      const dayTotal = transactions
        .filter((t) => {
          const tDate = new Date(t.date);
          return (
            tDate.getFullYear() === dayDate.getFullYear() &&
            tDate.getMonth() === dayDate.getMonth() &&
            tDate.getDate() === dayDate.getDate()
          );
        })
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      return { value: dayTotal, label: daysOfWeek[index] };
    });

    return data;
  }, [currentWeekStart, transactions]);

  const weekDisplay = `${format(currentWeekStart, "MMM dd")} - ${format(
    addDays(currentWeekStart, 6),
    "MMM dd"
  )}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Spending Trends</Text>
        <TouchableOpacity
          onPress={goThisWeek}
          style={{
            backgroundColor: "#11A4D4",
            padding: 6,
            borderRadius: 6,
            paddingHorizontal: 14,
          }}
        >
          <Text style={styles.thisWeek}>This Week</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity onPress={goPreviousWeek}>
          <MaterialIcons name="arrow-left" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.weekDisplay}>{weekDisplay}</Text>
        <TouchableOpacity onPress={goNextWeek}>
          <MaterialIcons name="arrow-right" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <BarChart
        data={weeklyData}
        frontColor="#11A4D4"
        hideRules
        barBorderTopLeftRadius={5}
        barBorderTopRightRadius={5}
        noOfSections={4}
        yAxisThickness={0}
        yAxisColor="transparent"
        hideYAxisText
        xAxisColor="#8796A9"
        xAxisLabelTextStyle={{ textAlign: "center", color: "#8796A9" }}
        height={200}
        showVerticalLines={false}
        initialSpacing={10}
        adjustToWidth={true}
        disableScroll={true}
        showValuesAsTopLabel={true}
        topLabelTextStyle={{ fontSize: 12, color: "#8796A9" }}
        topLabelContainerStyle={{
          paddingBottom: 6,
          width: 32,
          alignSelf: "center",
        }}
      />
    </View>
  );
};

export default WeeklySpendingTrends;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0F3845",
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  thisWeek: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  arrow: {
    fontSize: 20,
    color: "#000",
  },
  weekDisplay: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
});
