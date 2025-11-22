import TransactionForm from "@/components/TransactionForm";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Constants from "expo-constants";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getSingleTransaction,
  updateTransaction,
} from "@/src/api/transactions";

export default function TransactionEdit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [transaction, setTransaction] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransaction() {
      const { data, error } = await getSingleTransaction(id);

      if (error) {
        console.log(error);
        setLoading(false);
        return;
      }

      if (data) {
        const dateObj = data.date ? new Date(data.date) : new Date();
        setTransaction({
          ...data,
          date: dateObj,
        });
      }
      setLoading(false);
    }

    fetchTransaction();
  }, [id]);

  const handleSubmit = async (updated: any) => {
    const { error } = await updateTransaction(id, updated);

    if (error) {
      showMessage({
        message: "Error",
        description: "Something went wrong saving the transaction.",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
      });
      return;
    }

    showMessage({
      message: "Success",
      description: "Transaction updated successfully!",
      type: "success",
      statusBarHeight: Constants.statusBarHeight,
    });
    router.replace("/(tabs)/transactions");
  };

  if (loading) {
    return (
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "#101D22" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!transaction) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-semibold">Transaction not found</Text>
      </View>
    );
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        className="flex-1"
        style={{
          paddingHorizontal: 14,
          flexDirection: "column",
          backgroundColor: "#101D22",
        }}
        edges={["top"]}
      >
        <Text
          className="text-2xl font-semibold text-white mb-4"
          style={{ marginTop: 20 }}
        >
          Edit Transaction
        </Text>

        <TransactionForm initialData={transaction} onSubmit={handleSubmit} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}
