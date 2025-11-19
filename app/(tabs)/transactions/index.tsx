import { MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MonthlyTransactionDataPanel from "@/components/MonthlyTransactionDataPanel";
import TransactionItem from "@/components/TransactionItem";
import { mockTransactions } from "@/data/transactionsMockData";
import { transaction } from "@/types/transaction";
import { Link } from "expo-router";

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

  const renderItem = useCallback(
    ({ item }: { item: transaction }) => <TransactionItem transaction={item} />,
    []
  );

  // ---- Memoized keyExtractor ----
  const keyExtractor = useCallback((item: transaction) => item.id, []);

  return (
    <SafeAreaView className="flex-1 w-full px-4 pt-6" edges={["top"]}>
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

      {/* DATA PANEL */}
      <MonthlyTransactionDataPanel
        data={filteredTransactions}
        date={currentDate}
      />

      {/* CTA */}
      <View className="flex flex-row justify-center items-center">
        <Text className="flex-1 font-semibold text-2xl">Transactions</Text>
        <Link href="/transactions/create" asChild>
          <TouchableOpacity
            className="flex flex-row justify-center items-center"
            style={{
              backgroundColor: "black",
              paddingLeft: 7,
              paddingRight: 12,
              paddingVertical: 5,
              borderRadius: 6,
            }}
          >
            <MaterialIcons name="add" size={20} color="white" />
            <Text className="text-white font-semibold">New</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* FLASHLIST */}
      <FlashList
        className="flex-1"
        style={{ marginTop: 8 }}
        data={filteredTransactions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default TransactionsIndex;
