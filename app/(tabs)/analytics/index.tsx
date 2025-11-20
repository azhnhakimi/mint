import AnalyticsTopBar from "@/components/AnalyticsTopBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import AnalyticsArchives from "./archives";
import AnalyticsSpendings from "./spendings";

const Tab = createMaterialTopTabNavigator();

export default function AnalyticsIndex() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Tab.Navigator
        style={{ marginTop: 10 }}
        screenOptions={{
          tabBarStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            borderTopWidth: 0,
            backgroundColor: "transparent",
          },
        }}
        tabBar={(props) => <AnalyticsTopBar {...props} />}
      >
        <Tab.Screen name="Spendings" component={AnalyticsSpendings} />
        <Tab.Screen name="Archives" component={AnalyticsArchives} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
