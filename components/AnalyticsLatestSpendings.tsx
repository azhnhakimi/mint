// components/AnalyticsLatestSpendings.tsx
import { transaction } from "@/types/transaction";
import { format, isAfter, startOfMonth, subMonths } from "date-fns";
import { useMemo } from "react";
import { Dimensions, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const screenWidth = Dimensions.get("window").width;

type Props = {
  data: transaction[];
};

export default function AnalyticsLatestSpendings({ data }: Props) {
  const { chartData, total } = useMemo(() => {
    const now = new Date();
    const sixMonthsAgo = subMonths(startOfMonth(now), 5); // start of 6-month window

    // Filter transactions in last 6 months
    const filtered = data.filter((tx) => isAfter(tx.date, sixMonthsAgo));

    // Init structure: last 6 months empty amounts
    const monthsMap: Record<string, number> = {};
    for (let i = 5; i >= 0; i--) {
      const month = subMonths(now, i);
      const key = format(month, "yyyy-MM"); // e.g. "2025-11"
      monthsMap[key] = 0;
    }

    // Sum amounts into month buckets
    filtered.forEach((tx) => {
      const key = format(tx.date, "yyyy-MM");
      if (monthsMap[key] !== undefined) {
        monthsMap[key] += parseFloat(tx.amount);
      }
    });

    // Convert to chart-friendly array
    const chartData = Object.entries(monthsMap).map(([key, amount]) => ({
      value: amount,
      label: format(new Date(key + "-01"), "MMM"),
    }));

    // Compute total for display
    const total = chartData.reduce((acc, m) => acc + m.value, 0);

    return { chartData, total };
  }, [data]);

  return (
    <View style={{ width: "100%", paddingVertical: 12 }}>
      {/* Total for last 6 months */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          marginBottom: 12,
          textAlign: "left",
          paddingHorizontal: 8,
          color: "#1e293b",
        }}
      >
        Last 6 Months Spendings
      </Text>

      <View style={{ paddingHorizontal: 8 }}>
        <Text style={{ fontSize: 14, color: "#4b5563" }}>Total Spending</Text>
        <Text style={{ fontSize: 22, color: "#000000", fontWeight: "700" }}>
          RM {total.toFixed(2)}
        </Text>
      </View>

      <BarChart
        data={chartData}
        color="#000"
        noOfSections={4}
        adjustToWidth={true}
        disableScroll={true}
        height={260}
        isAnimated
        yAxisThickness={0}
        yAxisColor="transparent"
        hideYAxisText
        showVerticalLines={false}
        xAxisLabelTextStyle={{ textAlign: "center", color: "#1f2937" }}
        showValuesAsTopLabel={true}
        topLabelTextStyle={{ fontSize: 12, color: "#4b5563" }}
        topLabelContainerStyle={{
          width: 36,
          alignSelf: "center",
          marginBottom: 4,
        }}
      />
    </View>
  );
}
