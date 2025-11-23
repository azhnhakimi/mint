import CategoryProgressBar from "@/components/CategoryProgressBar";
import WeeklySpendingTrends from "@/components/WeeklySpendingTrends";
import { transaction } from "@/types/transaction";
import { useAuth } from "@clerk/clerk-expo";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

import DashboardHeader from "@/components/DashboardHeader";
import { getTransactionsByMonth } from "@/src/api/transactions";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DashboardIndex = () => {
  const { userId } = useAuth();
  const [transactions, setTransactions] = useState<transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentDate = new Date();
  const currentMonthName = currentDate.toLocaleString("default", {
    month: "long",
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

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [fetchTransactions])
  );

  // Total amount
  const getTotalAmount = (transactions: transaction[]): number => {
    return transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  };
  const totalAmount = getTotalAmount(transactions);

  // Group transactions by category and sum amounts
  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    transactions.forEach((t) => {
      if (!totals[t.category]) totals[t.category] = 0;
      totals[t.category] += parseFloat(t.amount);
    });
    return Object.entries(totals)
      .map(([category, value]) => ({ category, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  // State to toggle showing all categories
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowAll((prev) => !prev);
  };

  const displayedCategories = showAll
    ? categoryTotals
    : categoryTotals.slice(0, 3);

  return (
    <View className="flex-1" style={{ backgroundColor: "#101D22" }}>
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <DashboardHeader />
        {/* TOTAL AMOUNT */}
        <View
          style={{
            backgroundColor: "#0F3845",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            borderRadius: 12,
            gap: 8,
            marginTop: 16,
          }}
        >
          <Text style={{ color: "#8796A9" }}>
            Total Used for the Month of {currentMonthName}
          </Text>
          <Text className="text-3xl font-semibold" style={{ color: "#FFFFFF" }}>
            RM {totalAmount.toFixed(2)}
          </Text>
        </View>

        {/* CATEGORY PROGRESS BARS */}
        {displayedCategories.length > 0 && (
          <View style={{ marginTop: 16, marginBottom: 10 }}>
            {displayedCategories.map((item) => (
              <CategoryProgressBar
                key={item.category}
                category={item.category}
                value={item.value}
                max={totalAmount}
              />
            ))}

            {categoryTotals.length > 3 && (
              <TouchableOpacity
                onPress={toggleShowAll}
                style={{ marginTop: 8 }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {showAll
                    ? "View Less"
                    : `View More (${categoryTotals.length - 3})`}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* WEEKLY SPENDINGS TRENDS */}
        <WeeklySpendingTrends />
      </ScrollView>
    </View>
  );
};

export default DashboardIndex;
