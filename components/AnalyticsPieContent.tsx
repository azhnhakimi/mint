import { formatCategory, getCategoryColor } from "@/constants/categories";
import { useMemo } from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

type AnalyticsPieContentProps = {
  categoryTotals: { category: string; value: number }[];
};

const AnalyticsPieContent = ({ categoryTotals }: AnalyticsPieContentProps) => {
  const total = categoryTotals.reduce((acc, curr) => acc + curr.value, 0);
  const pieChartData = useMemo(
    () =>
      categoryTotals.map((item) => ({
        value: item.value,
        color: getCategoryColor(item.category),
      })),
    [categoryTotals]
  );

  return (
    <View
      className="flex-1 justify-center items-center rounded-lg"
      style={{
        paddingVertical: 12,
        marginVertical: 12,
        backgroundColor: "#0F172A",
        borderWidth: 1,
        borderColor: "#1E2A3C",
      }}
    >
      <PieChart data={pieChartData} radius={80} />
      <View style={{ width: "100%" }}>
        {categoryTotals.map((item, index) => {
          const percentage = total > 0 ? (item.value / total) * 100 : 0;

          return (
            <View
              key={index}
              className="flex flex-row justify-between items-center w-full px-4 py-2"
            >
              <View className="flex flex-row justify-center items-center gap-2">
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: getCategoryColor(item.category),
                    borderWidth: 1,
                    borderColor: "#8796A9",
                  }}
                />
                <Text style={{ color: "#8796A9" }} className="text-base">
                  {formatCategory(item.category)}
                </Text>
              </View>
              <Text
                className="text-base text-white"
                style={{ fontWeight: "600" }}
              >
                {percentage.toFixed(0)}%
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default AnalyticsPieContent;
