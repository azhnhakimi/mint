import { useUser } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import React from "react";
import { Text, View } from "react-native";

import { SignOutButton } from "./SignOutButton";

const DashboardHeader = (): React.ReactElement => {
  const { user } = useUser();

  const username =
    user?.username || user?.primaryEmailAddress?.emailAddress || "Guest";
  return (
    <View
      style={{
        marginTop: Constants.statusBarHeight,
        paddingVertical: 10,
        backgroundColor: "#101D22",
      }}
      className="px-4 flex flex-row justify-between items-center"
    >
      <Text className="text-base" style={{ color: "#8796A9" }}>
        Welcome back, {"\n"}
        <Text className="text-2xl font-semibold text-white">{username}</Text>
      </Text>
      <SignOutButton />
    </View>
  );
};

export default DashboardHeader;
