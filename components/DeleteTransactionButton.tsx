import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

type DeleteTransactionButtonProps = {
  onPress: () => void;
};

const DeleteTransactionButton = ({ onPress }: DeleteTransactionButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      className="flex flex-row justify-center items-center rounded-xl gap-2"
      style={{
        backgroundColor: "#ba1607",
        padding: 8,
      }}
    >
      <MaterialIcons name={"delete"} size={22} color="white" />
      <Text className="text-lg font-semibold" style={{ color: "white" }}>
        Delete
      </Text>
    </TouchableOpacity>
  );
};

export default DeleteTransactionButton;
