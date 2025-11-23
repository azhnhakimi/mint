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
import {
  formatCategory,
  getCategoryColor,
  getCategoryIcon,
} from "@/constants/categories";
import { formatDateDDMMYYYY } from "@/lib/utils";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";

import DeleteTransactionButton from "@/components/DeleteTransactionButton";
import EditTransactionButton from "@/components/EditTransactionButton";
import {
  deleteTransaction,
  getSingleTransaction,
} from "@/src/api/transactions";

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransaction() {
      const { data } = await getSingleTransaction(id);

      setTransaction(data);
      setLoading(false);
    }

    fetchTransaction();
  }, [id]);

  const handleDeleteTransaction = async (id: string) => {
    const { error } = await deleteTransaction(id);

    if (error) {
      showMessage({
        message: "Error",
        description: "Something went wrong deleting the transaction.",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
        backgroundColor: "#ff0000",
      });
      return;
    }

    showMessage({
      message: "Success",
      description: "Transaction deleted successfully!",
      type: "success",
      statusBarHeight: Constants.statusBarHeight,
      backgroundColor: "#198754",
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

  const iconName = getCategoryIcon(transaction.category);
  const iconColor = transaction.category === "personalCare" ? "black" : "white";
  const iconBgColor = getCategoryColor(transaction.category);
  const iconContainerStyle = useMemo(
    () => [{ backgroundColor: iconBgColor }],
    [iconBgColor]
  );

  return (
    <AlertDialog className="flex-1">
      <SafeAreaView
        className="flex-1 w-full px-4"
        edges={["top"]}
        style={{ backgroundColor: "#101D22" }}
      >
        <View className="flex flex-1 flex-col justify-center items-center">
          <View
            style={[iconContainerStyle, { width: 52, height: 52 }]}
            className="rounded-full flex items-center justify-center border border-gray-200 mb-4"
          >
            <MaterialIcons name={iconName} size={30} color={iconColor} />
          </View>
          <Text
            className="text-2xl font-semibold "
            style={{ color: "#EE4444" }}
          >
            RM {transaction.amount}
          </Text>
          <Text className="text-base text-white font-semibold">
            {transaction.name}
          </Text>
          <Text
            className=" text-sm"
            style={{ marginBottom: 24, color: "#8796A9" }}
          >
            {formatDateDDMMYYYY(transaction.date)}
          </Text>
        </View>

        <View
          className="w-full"
          style={{
            backgroundColor: "#141A1F",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 6,
            marginBottom: 16,
          }}
        >
          <Text className="text-sm" style={{ color: "#8796A9" }}>
            Category
          </Text>
          <Text className="text-white text-lg font-semibold">
            {formatCategory(transaction.category)}
          </Text>
        </View>

        <View
          className="flex-1 w-full"
          style={{
            backgroundColor: "#141A1F",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 6,
            marginBottom: 16,
          }}
        >
          <Text className=" text-sm" style={{ color: "#8796A9" }}>
            Notes
          </Text>
          {transaction.details !== "" ? (
            <Text className="text-white text-lg">{transaction.details}</Text>
          ) : (
            <Text className="text-white text-base">
              No details for this transaction
            </Text>
          )}
        </View>

        <View
          className="flex flex-row justify-center items-center"
          style={{ marginBottom: 16, gap: 8 }}
        >
          <EditTransactionButton transactionId={transaction.id} />
          <AlertDialogTrigger asChild>
            <TouchableOpacity className="flex-1">
              <DeleteTransactionButton />
            </TouchableOpacity>
          </AlertDialogTrigger>
        </View>

        <AlertDialogContent className="" style={{ backgroundColor: "#fff" }}>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete transaction?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to delete
              transaction {transaction.name}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction style={{ backgroundColor: "#EF4444" }} asChild>
              <TouchableOpacity
                onPress={() => handleDeleteTransaction(transaction.id)}
              >
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
}
