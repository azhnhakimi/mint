import TransactionForm from "@/components/TransactionForm";
import { mockTransactions } from "@/data/transactionsMockData";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TransactionEdit = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const transaction = mockTransactions.find((t) => t.id === id);

  if (!transaction) {
    return <Text>Transaction not found</Text>;
  }

  const handleSubmit = (updatedTransaction: any) => {
    console.log("Update transaction", updatedTransaction);
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        className="flex-1"
        style={{
          paddingHorizontal: 14,
          marginTop: 20,
          flexDirection: "column",
        }}
        edges={["top"]}
      >
        <Text className="text-2xl font-semibold text-black">
          Edit Transaction
        </Text>
        <TransactionForm initialData={transaction} onSubmit={handleSubmit} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default TransactionEdit;
