import { useAuth, useUser } from "@clerk/clerk-expo";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BudgetIndex = () => {
  const { user } = useUser();
  const { userId } = useAuth();

  const username =
    user?.username || user?.primaryEmailAddress?.emailAddress || "Guest";

  return (
    <SafeAreaView
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: "#101D22" }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#ffffff",
        }}
      >
        Feature coming soon!
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 20,
          color: "#8796A9",
        }}
      >
        Stay Tuned.
      </Text>
    </SafeAreaView>
  );
};

export default BudgetIndex;
