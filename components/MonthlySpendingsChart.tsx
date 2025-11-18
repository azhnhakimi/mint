import { transaction } from "@/types/transaction";
import { useMemo } from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

type MonthlyTransactionDataPanelProp = {
  transactions: transaction[];
  date: Date;
};

const EPSILON = 0.00001;

const { width: screenWidth } = Dimensions.get("window");

export default function MonthlySpendingsChart({
  transactions,
  date,
}: MonthlyTransactionDataPanelProp) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const chartData = useMemo(() => {
    const weeks = [0, 0, 0, 0, 0];

    for (const t of transactions) {
      const d = new Date(t.date);
      const day = d.getDate();
      const amount = parseFloat(t.amount);
      if (isNaN(amount)) continue;

      const weekIndex = Math.floor((day - 1) / 7);
      weeks[weekIndex] += amount;
    }

    return weeks
      .map((amount, i) => ({
        value: amount === 0 ? EPSILON : amount,
        realValue: amount,
        label: `W${i + 1}`,
      }))
      .slice(0, 5);
  }, [transactions, year, month, daysInMonth]);

  const getNiceMaxValue = (data: typeof chartData) => {
    const maxVal = Math.max(...data.map((d) => d.realValue));
    if (maxVal <= 50) return 50;
    return Math.ceil(maxVal / 50) * 50;
  };

  const niceMaxValue = getNiceMaxValue(chartData);
  const yAxisLabelWidth = 26;
  const initialEndSpacing = 20 + 20;
  const chartWidth = screenWidth - 32 - yAxisLabelWidth - initialEndSpacing;
  const spacing =
    chartData.length > 1 ? chartWidth / (chartData.length - 1) : chartWidth;

  return (
    <View className="">
      <LineChart
        key={`${month}-${year}`}
        data={chartData}
        curved
        isAnimated
        animateOnDataChange
        animationDuration={800}
        noOfSections={niceMaxValue <= 50 ? 2 : 4}
        maxValue={niceMaxValue}
        yAxisThickness={0}
        yAxisLabelWidth={yAxisLabelWidth}
        yAxisTextStyle={{ fontSize: 10, color: "gray" }}
        xAxisLabelTextStyle={{
          fontSize: 10,
          color: "gray",
          marginTop: 4,
        }}
        spacing={spacing}
        initialSpacing={20}
        endSpacing={40}
        disableScroll
        yAxisExtraHeight={20}
        areaChart
        startFillColor="rgb(0, 0, 0)"
        endFillColor="rgb(211, 211, 211)"
        startOpacity={0.7}
        endOpacity={0.1}
        color="rgb(0, 0, 0)"
      />
    </View>
  );
}
