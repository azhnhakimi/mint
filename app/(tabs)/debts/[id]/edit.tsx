import DebtForm from "@/components/DebtForm";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getSingleDebt, updateDebt } from "@/src/api/debts";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Constants from "expo-constants";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";

const DebtEditScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [debt, setDebt] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDebt() {
      const { data, error } = await getSingleDebt(id);

      if (error) {
        console.log(error);
        setLoading(false);
        return;
      }

      if (data) {
        const dateObj = data.date ? new Date(data.date) : new Date();
        setDebt({
          ...data,
          date: dateObj,
        });
      }
      setLoading(false);
    }

    fetchDebt();
  }, [id]);

  const handleSubmit = async (updated: any) => {
    const { error } = await updateDebt(id, updated);

    if (error) {
      showMessage({
        message: "Error",
        description: "Something went wrong saving the debt.",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
        backgroundColor: "#ff0000",
      });
      return;
    }

    showMessage({
      message: "Success",
      description: "Debt updated successfully!",
      type: "success",
      statusBarHeight: Constants.statusBarHeight,
      backgroundColor: "#198754",
    });
    router.replace("/(tabs)/debts");
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

  if (!debt) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-semibold">Debt not found</Text>
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
          Edit Debt
        </Text>

        <DebtForm initialData={debt} onSubmit={handleSubmit} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default DebtEditScreen;
