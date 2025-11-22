import { useAuth } from "@clerk/clerk-expo";
import { MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MonthlyTransactionDataPanel from "@/components/MonthlyTransactionDataPanel";
import TransactionItem from "@/components/TransactionItem";
import { getTransactionsByMonth } from "@/src/api/transactions";
import { transaction } from "@/types/transaction";
import { Link, useFocusEffect } from "expo-router";

const TransactionsIndex = () => {
  const { userId } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [transactions, setTransactions] = useState<transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formattedMonth = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const fetchTransactions = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    const { data, error } = await getTransactionsByMonth(
      userId,
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );

    if (error) {
      setError(error.message);
      setTransactions([]);
    } else {
      setTransactions(data || []);
    }
    setLoading(false);
  }, [userId, currentDate]);

  // Runs when month or userId changes
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Runs every time the screen becomes active (e.g. after editing)
  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [fetchTransactions])
  );

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

  const renderItem = useCallback(
    ({ item }: { item: transaction }) => <TransactionItem transaction={item} />,
    []
  );

  const keyExtractor = useCallback((item: transaction) => item.id, []);

  return (
    <SafeAreaView
      className="flex-1 w-full px-4 pt-6"
      edges={["top"]}
      style={{ backgroundColor: "#101D22" }}
    >
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity onPress={prevMonth}>
          <MaterialIcons name="chevron-left" size={28} color="white" />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-white">
          {formattedMonth}
        </Text>

        <TouchableOpacity onPress={nextMonth}>
          <MaterialIcons name="chevron-right" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <MonthlyTransactionDataPanel data={transactions} date={currentDate} />

      <View
        className="flex flex-row justify-center items-center"
        style={{ marginBottom: 8 }}
      >
        <Text className="flex-1 font-semibold text-2xl text-white">
          Transactions
        </Text>

        <Link href="/transactions/create" asChild>
          <TouchableOpacity
            className="flex flex-row justify-center items-center"
            style={{
              backgroundColor: "#11A4D4",
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

      {error && <Text className="text-red-500 text-center mb-2">{error}</Text>}

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      ) : transactions.length > 0 ? (
        <FlashList
          className="flex-1"
          style={{ marginTop: 8 }}
          data={transactions}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text className="text-center mt-4" style={{ color: "#8796A9" }}>
          No transactions found.
        </Text>
      )}
    </SafeAreaView>
  );
};

export default TransactionsIndex;
