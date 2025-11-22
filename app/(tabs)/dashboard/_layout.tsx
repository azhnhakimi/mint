import DashboardHeader from "@/components/DashboardHeader";
import { Stack } from "expo-router";

export default function DashboardLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => <DashboardHeader />,
      }}
    />
  );
}
