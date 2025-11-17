import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

const ICON_SIZE = 22;

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor: "#B4B4B4FF",
          animation: "shift",
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="dashboard" color={color} size={ICON_SIZE} />
            ),
          }}
        />
        <Tabs.Screen
          name="transactions"
          options={{
            title: "Transactions",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="exchange" size={ICON_SIZE} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="budget"
          options={{
            title: "Budget",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="chart-pie" size={ICON_SIZE} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: "Analytics",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="analytics" size={ICON_SIZE} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
