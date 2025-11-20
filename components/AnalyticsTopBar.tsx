import type { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AnalyticsTopBar({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const stringLabel =
          options.title !== undefined ? options.title : route.name;

        const label =
          options.tabBarLabel !== undefined ? options.tabBarLabel : stringLabel;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tabButton, isFocused && styles.activeTab]}
          >
            {typeof label === "string" ? (
              <Text
                style={{
                  color: isFocused ? "#ffffff" : "#888",
                  textAlign: "center",
                }}
              >
                {label}
              </Text>
            ) : (
              label({
                focused: isFocused,
                color: isFocused ? "#ffffff" : "#888",
                children: stringLabel,
              })
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingVertical: 2,
    paddingHorizontal: 6,
    justifyContent: "space-between",
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "#212122",
  },
});
