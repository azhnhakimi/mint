import AnalyticsCategorySpendings from "@/components/AnalyticsCategorySpendings";
import AnalyticsLatestSpendings from "@/components/AnalyticsLatestSpendings";
import { mockTransactions } from "@/data/transactionsMockData";
import { transaction } from "@/types/transaction";
import { useAuth } from "@clerk/clerk-expo";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { getTransactionsByMonth } from "@/src/api/transactions";

const AnalyticsSpendings = () => {
  const { userId } = useAuth();
  const currentDate = new Date();
  const [transactions, setTransactions] = useState<transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter transactions for the current month
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((t) => {
      const d = new Date(t.date);
      return (
        d.getMonth() === currentDate.getMonth() &&
        d.getFullYear() === currentDate.getFullYear()
      );
    });
  }, [currentDate]);

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

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [fetchTransactions])
  );

  const getTotalAmount = (transactions: transaction[]): number => {
    return transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  };

  const totalAmount = getTotalAmount(transactions);

  return (
    <ScrollView
      style={{ padding: 8, flex: 1, backgroundColor: "#101D22" }}
      showsVerticalScrollIndicator={false}
    >
      <AnalyticsLatestSpendings />

      <View
        style={{
          backgroundColor: "#0F172A",
          flexDirection: "column",
          justifyContent: "center",
          padding: 12,
          borderRadius: 12,
          gap: 6,
          marginVertical: 12,
          borderWidth: 1,
          borderColor: "#1E2A3C",
        }}
      >
        <Text style={{ color: "#8796A9" }}>Current Month Total Spendings</Text>
        <Text className="text-2xl font-semibold" style={{ color: "#FFFFFF" }}>
          RM {totalAmount.toFixed(2)}
        </Text>
      </View>

      <AnalyticsCategorySpendings
        currentDate={currentDate}
        transactions={transactions}
      />
    </ScrollView>
  );
};

export default AnalyticsSpendings;
