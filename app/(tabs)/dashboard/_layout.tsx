import DashboardHeader from "@/components/DashboardHeader";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function DashboardLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#101D22" />
      <Stack
        screenOptions={{
          header: () => <DashboardHeader />,
        }}
      />
    </>
  );
}
