import type { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AnalyticsTopBar({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.containerInner} className="rounded-lg">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const stringLabel =
            options.title !== undefined ? options.title : route.name;
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : stringLabel;
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
                    color: isFocused ? "#ffffff" : "#8796A9",
                    textAlign: "center",
                  }}
                >
                  {label}
                </Text>
              ) : (
                label({
                  focused: isFocused,
                  color: isFocused ? "#ffffff" : "#8796A9",
                  children: stringLabel,
                })
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  containerInner: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#0F3845",
    paddingVertical: 6,
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
    backgroundColor: "#11A4D4",
  },
});
