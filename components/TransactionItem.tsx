import {
  formatCategory,
  getCategoryColor,
  getCategoryIcon,
} from "@/constants/categories";
import { formatDateDDMMYYYY } from "@/lib/utils";
import { transaction } from "@/types/transaction";
import { MaterialIcons } from "@expo/vector-icons";
import { memo, useMemo } from "react";
import { Text, View } from "react-native";

const TransactionItem = ({ transaction }: { transaction: transaction }) => {
  const iconName = getCategoryIcon(transaction.category);
  const categoryColor = getCategoryColor(transaction.category);
  const iconColor = transaction.category === "personalCare" ? "black" : "white";
  const iconContainerStyle = useMemo(
    () => [{ backgroundColor: categoryColor }],
    [categoryColor]
  );

  return (
    <View className="flex-row items-center p-3 bg-white rounded-xl mb-2">
      <View
        style={iconContainerStyle}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200"
      >
        <MaterialIcons name={iconName} size={22} color={iconColor} />
      </View>

      <View className="flex-1 ml-3">
        <Text className="font-semibold text-base">{transaction.name}</Text>
        <Text className="text-sm text-gray-500">
          {formatCategory(transaction.category)}
        </Text>
      </View>

      <View className="flex flex-col justify-center items-end">
        <Text className="text-base font-semibold">RM {transaction.amount}</Text>
        <Text className="text-base text-gray-500">
          {formatDateDDMMYYYY(transaction.date)}
        </Text>
      </View>
    </View>
  );
};

export default memo(TransactionItem);
