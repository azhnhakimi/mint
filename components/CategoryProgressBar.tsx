import { formatCategory } from "@/constants/categories";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type CategoryProgressBarProps = {
  value: number;
  max: number;
  category: string;
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
};

const CategoryProgressBar = ({
  value,
  max,
  category,
  height = 8,
  backgroundColor = "#334155",
  fillColor = "#11A4D4",
}: CategoryProgressBarProps) => {
  const percentage = Math.min(Math.max(value / max, 0), 1) * 100;

  return (
    <View style={{ marginVertical: 6 }}>
      <View
        className="flex flex-row justify-between items-end"
        style={{ marginBottom: 4 }}
      >
        <Text className=" text-sm" style={{ color: "#8796A9" }}>
          {formatCategory(category)}
        </Text>
        <Text className="text-sm" style={{ color: "#8796A9" }}>
          RM{value.toFixed(2)}
        </Text>
      </View>
      <View style={[styles.container, { height, backgroundColor }]}>
        <View
          style={[
            styles.fill,
            { width: `${percentage}%`, backgroundColor: fillColor },
          ]}
        />
      </View>
    </View>
  );
};

export default CategoryProgressBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 10,
  },
  text: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
});
