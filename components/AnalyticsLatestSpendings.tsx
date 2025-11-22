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
    <View
      style={{
        width: "100%",
        paddingVertical: 12,
        backgroundColor: "#0F172A",
        borderWidth: 1,
        borderColor: "#1E2A3C",
        overflow: "hidden",
      }}
      className="rounded-lg"
    >
      {/* Total for last 6 months */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          marginBottom: 12,
          textAlign: "left",
          paddingHorizontal: 12,
          color: "#fff",
        }}
      >
        Last 6 Months Spendings
      </Text>

      <View style={{ paddingHorizontal: 8 }}>
        <Text style={{ fontSize: 14, color: "#8796A9" }}>Total Spending</Text>
        <Text style={{ fontSize: 22, color: "#ffffff", fontWeight: "700" }}>
          RM {total.toFixed(2)}
        </Text>
      </View>

      <BarChart
        data={chartData}
        hideRules
        barBorderTopLeftRadius={5}
        barBorderTopRightRadius={5}
        frontColor="#11A4D4"
        noOfSections={4}
        adjustToWidth={true}
        disableScroll={true}
        height={260}
        isAnimated
        yAxisThickness={0}
        yAxisExtraHeight={40}
        yAxisColor="transparent"
        hideYAxisText
        showVerticalLines={false}
        xAxisLabelTextStyle={{ textAlign: "center", color: "#8796A9" }}
        showValuesAsTopLabel={true}
        xAxisColor="#8796A9"
        topLabelTextStyle={{ fontSize: 12, color: "#8796A9" }}
        topLabelContainerStyle={{
          width: 36,
          alignSelf: "center",
          paddingBottom: 6,
        }}
      />
    </View>
  );
}
