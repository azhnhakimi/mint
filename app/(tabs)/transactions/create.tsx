import TransactionForm from "@/components/TransactionForm";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TransactionCreate = () => {
  const handleSubmit = (data: any) => {
    console.log("Create transaction:", data);
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
          Create Transaction
        </Text>
        <TransactionForm onSubmit={handleSubmit} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default TransactionCreate;
