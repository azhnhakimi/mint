import { SignOutButton } from "@/components/SignOutButton";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import { Text, TouchableOpacity } from "react-native";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";

const BudgetIndex = () => {
  const { user } = useUser();
  const { userId } = useAuth();

  const username =
    user?.username || user?.primaryEmailAddress?.emailAddress || "Guest";

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text>Hello {username}!</Text>
      <Text>User ID: {userId}</Text>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Feature coming soon!
      </Text>
      <SignOutButton />

      <TouchableOpacity
        style={{
          backgroundColor: "#212122",
          padding: 10,
          marginTop: 20,
          borderRadius: 5,
        }}
        onPress={() => {
          showMessage({
            message: "This is a flash message",
            description: "Simple message",
            type: "danger",
            statusBarHeight: Constants.statusBarHeight,
          });
        }}
      >
        <Text style={{ color: "#fff" }}>Press Me</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BudgetIndex;
