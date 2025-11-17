import { MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TransactionItem from "@/components/TransactionItem";
import { mockTransactions } from "@/data/transactionsMockData";

const TransactionsIndex = () => {
  // Store current selected month (default: current month)
  const [currentDate, setCurrentDate] = useState(new Date());

  const formattedMonth = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((t) => {
      const d = new Date(t.date);
      return (
        d.getMonth() === currentDate.getMonth() &&
        d.getFullYear() === currentDate.getFullYear()
      );
    });
  }, [currentDate]);

  return (
    <SafeAreaView className="flex-1 w-full pt-6 px-4">
      {/* MONTH NAVIGATOR */}
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity onPress={prevMonth}>
          <MaterialIcons name="chevron-left" size={28} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">{formattedMonth}</Text>
        <TouchableOpacity onPress={nextMonth}>
          <MaterialIcons name="chevron-right" size={28} />
        </TouchableOpacity>
      </View>

      {/* FLASHLIST */}
      <FlashList
        data={filteredTransactions}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default TransactionsIndex;
