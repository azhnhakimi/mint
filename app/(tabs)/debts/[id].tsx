import DeleteTransactionButton from "@/components/DeleteTransactionButton";
import EditDebtButton from "@/components/EditDebtButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatDateDDMMYYYY } from "@/lib/utils";
import { deleteDebt, getSingleDebt } from "@/src/api/debts";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Constants from "expo-constants";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";

const getCategoryDisplayString = (category: string) => {
  if (category === "Money I Owe") return "You Owe";
  if (category === "Money Owed To Me") return "Owes You";
  return "Unknown Category";
};

const DebtDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [debt, setDebt] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDebt() {
      const { data } = await getSingleDebt(id);

      setDebt(data);
      setLoading(false);
    }

    fetchDebt();
  }, [id]);

  const handleDebtDelete = async (id: string) => {
    const { error } = await deleteDebt(id);

    if (error) {
      showMessage({
        message: "Error",
        description: "Something went wrong deleting the debt.",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
        backgroundColor: "#ff0000",
      });
      return;
    }

    showMessage({
      message: "Success",
      description: "Debt deleted successfully!",
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
    <AlertDialog className="flex-1">
      <SafeAreaView
        style={{ backgroundColor: "#101D22", flex: 1, padding: 12 }}
        edges={["top"]}
      >
        <View style={{ marginVertical: 20, alignItems: "center" }}>
          <Text className="text-white font-bold text-lg">{debt?.name}</Text>
          <Text className="text-sm font-bold" style={{ color: "#8796A9" }}>
            {getCategoryDisplayString(debt?.category)}
          </Text>
          <Text
            className="font-bold"
            style={{ color: "#11A4D4", fontSize: 24 }}
          >
            RM {debt?.amount}
          </Text>
        </View>

        <View
          style={{ backgroundColor: "#1C2630", marginVertical: 12 }}
          className="rounded-lg flex-1"
        >
          <View
            className="flex flex-row space-between items-center"
            style={{ paddingHorizontal: 8, paddingVertical: 16 }}
          >
            <View className="flex-1 flex flex-row gap-2">
              <MaterialIcons name="calendar-today" size={18} color="#94A3B8" />
              <Text style={{ color: "#94A3B8" }}>Date Created</Text>
            </View>
            <Text style={{ color: "#ffffff" }}>
              {formatDateDDMMYYYY(debt?.date)}
            </Text>
          </View>
          <View style={{ backgroundColor: "#94A3B8", height: 1 }}></View>
          <View
            className="flex flex-row space-between items-center"
            style={{ paddingHorizontal: 8, paddingVertical: 16 }}
          >
            <View className="flex-1 flex flex-row gap-2">
              <AntDesign name="info-circle" size={18} color="#94A3B8" />
              <Text style={{ color: "#94A3B8" }}>Status</Text>
            </View>
            <Text style={{ color: "#ffffff" }}>{debt?.status}</Text>
          </View>
          <View style={{ backgroundColor: "#94A3B8", height: 1 }}></View>
          <View
            className="flex flex-col space-between items-start gap-4"
            style={{ paddingHorizontal: 8, paddingVertical: 16 }}
          >
            <View className="flex flex-row gap-2">
              <AntDesign name="file-text" size={18} color="#94A3B8" />
              <Text style={{ color: "#94A3B8" }}>Notes</Text>
            </View>
            <Text style={{ color: "#ffffff" }}>{debt?.note}</Text>
          </View>
        </View>

        <View
          className="flex flex-row justify-center items-center"
          style={{ marginBottom: 16, gap: 8 }}
        >
          <EditDebtButton debtId={id} />
          <AlertDialogTrigger asChild>
            <TouchableOpacity className="flex-1">
              <DeleteTransactionButton />
            </TouchableOpacity>
          </AlertDialogTrigger>
        </View>

        <AlertDialogContent className="" style={{ backgroundColor: "#fff" }}>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete debt?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to delete debt{" "}
              {debt.name}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction style={{ backgroundColor: "#EF4444" }} asChild>
              <TouchableOpacity onPress={() => handleDebtDelete(debt.id)}>
                <Text style={{ color: "#3C2529" }}>Delete</Text>
              </TouchableOpacity>
            </AlertDialogAction>
            <AlertDialogCancel>
              <Text>Cancel</Text>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </SafeAreaView>
    </AlertDialog>
  );
};

export default DebtDetailScreen;
