import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function ConfirmDeleteModal({
  visible,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50 px-6">
        <View className="bg-white rounded-lg p-6 w-full">
          <Text className="text-xl font-semibold mb-4 text-black">
            Delete Transaction?
          </Text>
          <Text className="text-gray-700 mb-6">
            Are you sure you want to delete this transaction?
          </Text>

          <View className="flex-row justify-end gap-4">
            <TouchableOpacity onPress={onCancel}>
              <Text className="text-gray-600 text-base">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onConfirm}>
              <Text className="text-red-600 text-base font-semibold">
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
