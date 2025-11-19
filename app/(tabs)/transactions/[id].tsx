import DeleteTransactionButton from "@/components/DeleteTransactionButton";
import EditTransactionButton from "@/components/EditTransactionButton";
import {
  formatCategory,
  getCategoryColor,
  getCategoryIcon,
} from "@/constants/categories";
import { mockTransactions } from "@/data/transactionsMockData";
import { formatDateDDMMYYYY } from "@/lib/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const transaction = useMemo(
    () => mockTransactions.find((t) => t.id === id),
    [id]
  );

  if (!transaction) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-semibold">Transaction not found</Text>
      </View>
    );
  }

  const iconName = getCategoryIcon(transaction.category);
  const iconColor = transaction.category === "personalCare" ? "black" : "white";
  const iconBgColor = getCategoryColor(transaction.category);
  const iconContainerStyle = useMemo(
    () => [{ backgroundColor: iconBgColor }],
    [iconBgColor]
  );

  return (
    <SafeAreaView className="flex-1 w-full px-4" edges={["top"]}>
      <View className="flex flex-1 flex-col justify-center items-center">
        <View
          style={[iconContainerStyle, { width: 52, height: 52 }]}
          className="rounded-full flex items-center justify-center border border-gray-200 mb-4"
        >
          <MaterialIcons name={iconName} size={30} color={iconColor} />
        </View>
        <Text className="text-2xl font-semibold text-black">
          RM {transaction.amount}
        </Text>
        <Text className="text-base text-gray-600 font-semibold">
          {transaction.name}
        </Text>
        <Text className="text-gray-600 text-sm" style={{ marginBottom: 24 }}>
          {formatDateDDMMYYYY(transaction.date)}
        </Text>
      </View>

      <View
        className="w-full"
        style={{
          borderWidth: 1,
          borderColor: "lightgray",
          backgroundColor: "#EAEAEA",
          paddingHorizontal: 6,
          paddingVertical: 8,
          borderRadius: 6,
          marginBottom: 16,
        }}
      >
        <Text className="text-gray-600 text-sm">Category</Text>
        <Text className="text-black text-lg font-semibold">
          {formatCategory(transaction.category)}
        </Text>
      </View>

      <View
        className="flex-1 w-full"
        style={{
          borderWidth: 1,
          borderColor: "lightgray",
          backgroundColor: "#EAEAEA",
          paddingHorizontal: 6,
          paddingVertical: 8,
          borderRadius: 6,
          marginBottom: 16,
        }}
      >
        <Text className="text-gray-600 text-sm">Notes</Text>
        <Text className="text-black text-lg">{transaction.details}</Text>
      </View>

      <View className="flex flex-col" style={{ marginBottom: 16, gap: 6 }}>
        <EditTransactionButton transactionId={transaction.id} />
        <DeleteTransactionButton />
      </View>
    </SafeAreaView>
  );
}
