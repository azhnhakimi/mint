import DebtForm from "@/components/DebtForm";
import { useAuth } from "@clerk/clerk-expo";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";

import { addDebt } from "@/src/api/debts";

const DebtCreate = () => {
  const { userId } = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    if (data.name.trim() === "") {
      showMessage({
        message: "Error",
        description: "Name is required!",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
        backgroundColor: "#ff0000",
      });
      return;
    }

    if (data.amount === "") {
      showMessage({
        message: "Error",
        description: "Amount is required!",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
        backgroundColor: "#ff0000",
      });
      return;
    }

    if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(data.amount)) {
      showMessage({
        message: "Error",
        description: "Please enter a valid amount!",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
        backgroundColor: "#ff0000",
      });
      return;
    }

    if (parseFloat(data.amount) <= 0) {
      showMessage({
        message: "Error",
        description: "Amount must be greater than 0!",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
        backgroundColor: "#ff0000",
      });
      return;
    }

    if (data.category.trim() === "") {
      showMessage({
        message: "Error",
        description: "Please select a category!",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
        backgroundColor: "#ff0000",
      });
      return;
    }

    if (data.status.trim() === "") {
      showMessage({
        message: "Error",
        description: "Please select a status!",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
        backgroundColor: "#ff0000",
      });
      return;
    }

    const finalData = {
      userId: userId,
      name: data.name.trim(),
      amount: parseFloat(data.amount),
      date: data.date,
      category: data.category,
      status: data.status,
      note: data.note,
    };

    const { data: result, error } = await addDebt(finalData);

    if (error) {
      console.log("Supabase error:", error);
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
      description: "Debt added successfully!",
      type: "success",
      statusBarHeight: Constants.statusBarHeight,
      backgroundColor: "#198754",
    });
    router.back();
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        style={{
          backgroundColor: "#101D22",
          flex: 1,
          paddingHorizontal: 14,
          flexDirection: "column",
        }}
        edges={["top"]}
      >
        <Text
          className="text-2xl font-semibold text-white"
          style={{ marginTop: 20 }}
        >
          Create Debt
        </Text>
        <DebtForm onSubmit={handleSubmit} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default DebtCreate;
