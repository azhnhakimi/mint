import CategoryProgressBar from "@/components/CategoryProgressBar";
import WeeklySpendingTrends from "@/components/WeeklySpendingTrends";
import { mockTransactions } from "@/data/transactionsMockData";
import { transaction } from "@/types/transaction";
import { useMemo, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager, // Import ScrollView
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DashboardIndex = () => {
  const currentDate = new Date();
  const currentMonthName = currentDate.toLocaleString("default", {
    month: "long",
  });

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

  // Total amount
  const getTotalAmount = (transactions: transaction[]): number => {
    return transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  };
  const totalAmount = getTotalAmount(filteredTransactions);

  // Group transactions by category and sum amounts
  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    filteredTransactions.forEach((t) => {
      if (!totals[t.category]) totals[t.category] = 0;
      totals[t.category] += parseFloat(t.amount);
    });
    return Object.entries(totals)
      .map(([category, value]) => ({ category, value }))
      .sort((a, b) => b.value - a.value);
  }, [filteredTransactions]);

  // State to toggle showing all categories
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    // Smooth animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowAll((prev) => !prev);
  };

  // Determine which categories to show
  const displayedCategories = showAll
    ? categoryTotals
    : categoryTotals.slice(0, 3);

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <ScrollView
        className="flex-1 px-4"
        style={{ paddingVertical: 24, marginBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* TOTAL AMOUNT */}
        <View
          style={{
            backgroundColor: "#212122",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            borderRadius: 12,
            gap: 8,
          }}
        >
          <Text style={{ color: "#9ca3af" }}>
            Total Used for the Month of {currentMonthName}
          </Text>
          <Text className="text-3xl font-semibold" style={{ color: "#FFFFFF" }}>
            RM {totalAmount.toFixed(2)}
          </Text>
        </View>

        {/* CATEGORY PROGRESS BARS */}
        <View style={{ marginTop: 16, marginBottom: 10 }}>
          {displayedCategories.map((item) => (
            <CategoryProgressBar
              key={item.category}
              category={item.category}
              value={item.value}
              max={totalAmount}
              fillColor="#000"
              backgroundColor="#E0E0E0"
            />
          ))}

          {categoryTotals.length > 3 && (
            <TouchableOpacity onPress={toggleShowAll} style={{ marginTop: 8 }}>
              <Text
                style={{
                  color: "#000",
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

        {/* WEEKLY SPENDINGS TRENDS */}
        <WeeklySpendingTrends transactions={filteredTransactions} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardIndex;
