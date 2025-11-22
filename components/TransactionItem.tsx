import {
  formatCategory,
  getCategoryColor,
  getCategoryIcon,
} from "@/constants/categories";
import { formatDateDDMMYYYY } from "@/lib/utils";
import { transaction } from "@/types/transaction";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { memo, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const TransactionItem = ({ transaction }: { transaction: transaction }) => {
  const iconName = getCategoryIcon(transaction.category);
  const categoryColor = getCategoryColor(transaction.category);
  const iconColor = transaction.category === "personalCare" ? "black" : "white";
  const iconContainerStyle = useMemo(
    () => [{ backgroundColor: categoryColor }],
    [categoryColor]
  );

  return (
    <Link
      href={{
        pathname: "/transactions/[id]",
        params: { id: transaction.id },
      }}
      asChild
    >
      <TouchableOpacity
        className="flex-row items-center p-3 rounded-xl mb-2"
        style={{ backgroundColor: "#141A1F" }}
      >
        <View
          style={iconContainerStyle}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200"
        >
          <MaterialIcons name={iconName} size={22} color={iconColor} />
        </View>

        <View className="flex-1 ml-3">
          <Text className="font-semibold text-base text-white">
            {transaction.name}
          </Text>
          <Text className="text-sm " style={{ color: "#8796A9" }}>
            {formatCategory(transaction.category)}
          </Text>
        </View>

        <View className="flex flex-col justify-center items-end">
          <Text
            className="text-base font-semibold"
            style={{ color: "#EE4444" }}
          >
            RM {parseFloat(transaction.amount).toFixed(2)}
          </Text>
          <Text className="text-base " style={{ color: "#8796A9" }}>
            {formatDateDDMMYYYY(transaction.date)}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default memo(TransactionItem);
