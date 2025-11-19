import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

type EditTransactionButtonProps = {
  transactionId: string;
};

const EditTransactionButton = ({
  transactionId,
}: EditTransactionButtonProps) => {
  return (
    <Link href={`/transactions/${transactionId}/edit`} asChild>
      <TouchableOpacity
        className="flex flex-row justify-center items-center rounded-xl gap-2"
        style={{ backgroundColor: "#212122", padding: 8 }}
      >
        <MaterialIcons name={"edit"} size={22} color="white" />
        <Text className="text-white text-lg font-semibold">Edit</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default EditTransactionButton;
