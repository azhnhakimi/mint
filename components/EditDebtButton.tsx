import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

type EditDebtButtonProps = {
  debtId: string;
};

const EditDebtButton = ({ debtId }: EditDebtButtonProps) => {
  return (
    <Link
      href={{
        pathname: "/debts/[id]/edit",
        params: { id: debtId },
      }}
      asChild
    >
      <TouchableOpacity
        className="flex flex-row justify-center items-center rounded-lg gap-2 flex-1"
        style={{ backgroundColor: "#104657", paddingVertical: 8 }}
      >
        <MaterialIcons name={"edit"} size={22} color="#11A4D4" />
        <Text className="text-lg font-semibold" style={{ color: "#11A4D4" }}>
          Edit
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default EditDebtButton;
