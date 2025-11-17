import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

export type Category = (typeof categories)[number];
export type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

export const categories = [
  "food",
  "entertainment",
  "utilities",
  "transport",
  "personalCare",
  "savings",
  "clothing",
  "supplies",
  "subscriptions",
  "miscellaneous",
];

export const categoriesColorMap: Record<Category, string> = {
  food: "#D84C4C",
  entertainment: "#8B5CF6",
  utilities: "#E88443",
  transport: "#3B82F6",
  personalCare: "#FFFFFF",
  savings: "#279D63",
  clothing: "#6B7280",
  supplies: "#EC4899",
  subscriptions: "#000000",
  miscellaneous: "#A855F7",
};

export const categoriesIconMap: Record<Category, IconName> = {
  food: "fastfood",
  entertainment: "movie",
  utilities: "lightbulb",
  transport: "commute",
  personalCare: "spa",
  savings: "savings",
  clothing: "checkroom",
  supplies: "shopping-basket",
  subscriptions: "subscriptions",
  miscellaneous: "category",
};

/**
 * Retrieves the color for a given category.
 * @param category The category name.
 * @returns The corresponding hex color string or a default gray color if not found.
 */
export const getCategoryColor = (category: string): string => {
  return categoriesColorMap[category as Category] || "#9CA3AF"; // Default: gray-400
};

/**
 * Retrieves the MaterialIcons name for a given category.
 * @param category The category name.
 * @returns The corresponding icon name or a default 'help-outline' icon if not found.
 */
export const getCategoryIcon = (category: string): IconName => {
  return categoriesIconMap[category as Category] || "help-outline";
};

export const formatCategory = (category: string): string => {
  return (
    category
      // insert space before capital letters (camelCase → camel Case)
      .replace(/([A-Z])/g, " $1")
      // capitalize first letter of each word
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim()
  );
};
