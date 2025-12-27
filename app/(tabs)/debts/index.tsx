import AnalyticsTopBar from "@/components/AnalyticsTopBar";
import DebtsIOwe from "@/components/DebtsIOwe";
import DebtsOwedToMe from "@/components/DebtsOwedToMe";
import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Link } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

const DebtsIndex = () => {
  return (
    <SafeAreaView
      style={{ backgroundColor: "#101D22", flex: 1 }}
      edges={["top"]}
    >
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
        <Tab.Screen name="I Owe" component={DebtsIOwe} />
        <Tab.Screen name="Owed To Me" component={DebtsOwedToMe} />
      </Tab.Navigator>

      <Link href="/debts/create" asChild>
        <TouchableOpacity
          className="flex flex-row justify-center items-center"
          style={{
            backgroundColor: "#11A4D4",
            marginHorizontal: 16,
            marginVertical: 10,
            paddingVertical: 8,
            borderRadius: 6,
          }}
        >
          <MaterialIcons name="add" size={20} color="white" />
          <Text className="text-white font-semibold">Create</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default DebtsIndex;
