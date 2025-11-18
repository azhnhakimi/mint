import { transaction } from "@/types/transaction";
import { Text, View } from "react-native";
import MonthlySpendingsChart from "./MonthlySpendingsChart";

type MonthlyTransactionDataPanelProp = {
  data: transaction[];
  date: Date;
};

export const getTotalAmount = (transactions: transaction[]): string => {
  const total = transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  return total.toFixed(2);
};

const MonthlyTransactionDataPanel = ({
  data = [],
  date,
}: MonthlyTransactionDataPanelProp) => {
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const monthName = date.toLocaleDateString("en-US", { month: "short" });

  return (
    <View className="mb-4 ">
      <Text className="text-2xl font-semibold text-black">
        RM {getTotalAmount(data)}
      </Text>
      <Text className="text-base text-gray-600">
        {`${monthName} ${monthStart.getDate()} - ${monthName} ${monthEnd.getDate()}`}
      </Text>

      <MonthlySpendingsChart transactions={data} date={date} />
    </View>
  );
};

export default MonthlyTransactionDataPanel;
