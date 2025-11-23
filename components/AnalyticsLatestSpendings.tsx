// components/AnalyticsLatestSpendings.tsx
import { getLast6MonthsTotals } from "@/src/api/transactions";
import { useUser } from "@clerk/clerk-expo";
import { format, subMonths } from "date-fns";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export default function AnalyticsLatestSpendings() {
  const { user } = useUser();
  const [data, setData] = useState<{ month: string; total: number }[]>([]);

  useEffect(() => {
    if (!user) return;
    getLast6MonthsTotals(user.id).then(({ data: d, error }) => {
      if (!error && d) setData(d as any);
    });
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (!user) return;
      getLast6MonthsTotals(user.id).then(({ data: d, error }) => {
        if (!error && d) setData(d as any);
      });
    }, [getLast6MonthsTotals])
  );

  const { chartData, total } = useMemo(() => {
    const now = new Date();
    const monthsMap: Record<string, number> = {};
    for (let i = 5; i >= 0; i--) {
      const month = subMonths(now, i);
      monthsMap[format(month, "yyyy-MM")] = 0;
    }

    data.forEach((m) => {
      if (monthsMap[m.month] !== undefined) monthsMap[m.month] = m.total;
    });

    const chartData = Object.entries(monthsMap).map(([key, value]) => ({
      value,
      label: format(new Date(key + "-01"), "MMM"),
    }));

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
        borderRadius: 12,
      }}
    >
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

      <View style={{ paddingHorizontal: 12, marginBottom: 12 }}>
        <Text style={{ fontSize: 14, color: "#8796A9" }}>Total Spending</Text>
        <Text style={{ fontSize: 22, color: "#fff", fontWeight: "700" }}>
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
        adjustToWidth
        disableScroll
        height={260}
        yAxisThickness={0}
        yAxisColor="transparent"
        hideYAxisText
        showVerticalLines={false}
        xAxisLabelTextStyle={{ textAlign: "center", color: "#8796A9" }}
        showValuesAsTopLabel
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
