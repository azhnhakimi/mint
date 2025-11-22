import { formatCategory, getCategoryColor } from "@/constants/categories";
import { Text, View } from "react-native";

type AnalyticsListContentProps = {
  categoryTotals: { category: string; value: number }[];
};

const AnalyticsListContent = ({
  categoryTotals,
}: AnalyticsListContentProps) => {
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
      {categoryTotals.map((item, index) => (
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
          <Text className="text-base text-white" style={{ fontWeight: "600" }}>
            RM{item.value.toFixed(2)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default AnalyticsListContent;
