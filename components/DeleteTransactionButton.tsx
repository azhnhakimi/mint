import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const DeleteTransactionButton = () => {
  return (
    <View
      className="flex flex-row justify-center items-center rounded-lg gap-2 flex-1"
      style={{
        backgroundColor: "#3C2529",
        paddingVertical: 8,
      }}
    >
      <MaterialIcons name={"delete"} size={22} color="#EF4444" />
      <Text className="text-lg font-semibold" style={{ color: "#EF4444" }}>
        Delete
      </Text>
    </View>
  );
};

export default DeleteTransactionButton;
