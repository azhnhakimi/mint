import { SignOutButton } from "@/components/SignOutButton";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DashboardIndex = () => {
  return (
    <SafeAreaView>
      <Text>Dashboard</Text>
      <SignOutButton />
    </SafeAreaView>
  );
};

export default DashboardIndex;
