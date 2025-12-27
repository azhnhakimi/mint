import { formatDateDDMMYYYY } from "@/lib/utils";
import { debt } from "@/types/debts";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const DebtPanel = ({ debt }: { debt: debt }) => {
  return (
    <Link
      href={{
        pathname: "/debts/[id]",
        params: { id: debt.id },
      }}
      asChild
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#141A1F",
          display: "flex",
          flexDirection: "row",
          padding: 12,
          borderRadius: 8,
          gap: 12,
          alignItems: "center",
        }}
      >
        <View className="flex-1">
          <Text className="font-semibold text-white">{debt.name}</Text>
          <Text style={{ color: "#8796A9" }}>{debt.note}</Text>
        </View>
        <View>
          <Text
            className="font-bold"
            style={{
              color: debt.category === "Money I Owe" ? "#FB7185" : "#34D399",
            }}
          >
            RM {debt.amount}
          </Text>
          <Text className="text-xs font-semibold" style={{ color: "#8796A9" }}>
            {formatDateDDMMYYYY(debt.date)}
          </Text>
          <Text
            className="text-xs font-bold"
            style={{ color: debt.status === "Paid" ? "#198754" : "#ffde21" }}
          >
            {debt.status.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default DebtPanel;
