import { getDebtsOwedToMe } from "@/src/api/debts";
import { debt } from "@/types/debts";
import { useAuth } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import DebtPanel from "./DebtPanel";

const DebtsOwedToMe = () => {
  const { userId } = useAuth();
  const [debts, setDebts] = useState<debt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const renderItem = useCallback(
    ({ item }: { item: debt }) => <DebtPanel debt={item} />,
    []
  );
  const keyExtractor = useCallback((item: debt) => item.id, []);

  const totalAmount = debts.reduce(
    (sum, item) => sum + parseFloat(item.amount),
    0
  );

  const fetchDebts = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    const { data, error } = await getDebtsOwedToMe(userId);

    if (error) {
      setError(error.message);
      setDebts([]);
    } else {
      setDebts(data || []);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchDebts();
  }, [fetchDebts]);

  useFocusEffect(
    useCallback(() => {
      fetchDebts();
    }, [fetchDebts])
  );

  return (
    <View style={{ padding: 8, flex: 1, backgroundColor: "#101D22" }}>
      <View
        style={{
          backgroundColor: "#142F33",
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Text className="font-bold text-xs" style={{ color: "#8796A9" }}>
          AMOUNT
        </Text>
        <Text style={{ color: "#34D399", fontWeight: "800", fontSize: 24 }}>
          RM {totalAmount.toFixed(2)}
        </Text>
      </View>

      {error && <Text className="text-red-500 text-center mb-2">{error}</Text>}

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      ) : debts.length > 0 ? (
        <FlashList
          className="flex-1"
          style={{ marginTop: 8 }}
          data={debts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text className="text-center mt-4" style={{ color: "#8796A9" }}>
          No debts found.
        </Text>
      )}
    </View>
  );
};

export default DebtsOwedToMe;
