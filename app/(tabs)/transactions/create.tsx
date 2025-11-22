import TransactionForm from "@/components/TransactionForm";
import { useAuth } from "@clerk/clerk-expo";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";

import { addTransaction } from "@/src/api/transactions";

const TransactionCreate = () => {
  const { userId } = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    if (data.name.trim() === "") {
      showMessage({
        message: "Error",
        description: "Name is required!",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
      });
      return;
    }

    if (data.amount === "") {
      showMessage({
        message: "Error",
        description: "Amount is required!",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
      });
      return;
    }

    if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(data.amount)) {
      showMessage({
        message: "Error",
        description: "Please enter a valid amount!",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
      });
      return;
    }

    if (parseFloat(data.amount) <= 0) {
      showMessage({
        message: "Error",
        description: "Amount must be greater than 0!",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
      });
      return;
    }

    if (data.category.trim() === "") {
      showMessage({
        message: "Error",
        description: "Please select a category!",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
      });
      return;
    }

    const finalData = {
      userId: userId,
      name: data.name.trim(),
      amount: parseFloat(data.amount),
      date: data.date,
      category: data.category,
      details: data.details,
    };

    const { data: result, error } = await addTransaction(finalData);

    if (error) {
      console.log("Supabase error:", error);
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
      description: "Transaction added successfully!",
      type: "success",
      statusBarHeight: Constants.statusBarHeight,
    });
    router.back();
  };

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
          className="text-2xl font-semibold text-white"
          style={{ marginTop: 20 }}
        >
          Create Transaction
        </Text>
        <TransactionForm onSubmit={handleSubmit} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default TransactionCreate;
