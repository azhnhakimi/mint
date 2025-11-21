import { SignOutButton } from "@/components/SignOutButton";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Text } from "react-native";
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
    </SafeAreaView>
  );
};

export default BudgetIndex;
