import AnalyticsCategorySpendings from "@/components/AnalyticsCategorySpendings";
import AnalyticsLatestSpendings from "@/components/AnalyticsLatestSpendings";
import { mockTransactions } from "@/data/transactionsMockData";
import { transaction } from "@/types/transaction";
import { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";

const AnalyticsSpendings = () => {
  const currentDate = new Date();

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

  const getTotalAmount = (transactions: transaction[]): number => {
    return transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  };

  const totalAmount = getTotalAmount(filteredTransactions);

  return (
    <ScrollView
      style={{ padding: 8, flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <AnalyticsLatestSpendings data={mockTransactions} />

      <View
        style={{
          backgroundColor: "#212122",
          flexDirection: "column",
          justifyContent: "center",
          padding: 12,
          borderRadius: 12,
          gap: 6,
          marginVertical: 12,
        }}
      >
        <Text style={{ color: "#9ca3af" }}>Current Month Total Spendings</Text>
        <Text className="text-2xl font-semibold" style={{ color: "#FFFFFF" }}>
          RM {totalAmount.toFixed(2)}
        </Text>
      </View>

      <AnalyticsCategorySpendings
        currentDate={currentDate}
        transactions={filteredTransactions}
      />
    </ScrollView>
  );
};

export default AnalyticsSpendings;
