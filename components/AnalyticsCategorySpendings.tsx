import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { transaction } from "@/types/transaction";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { format } from "date-fns";
import * as React from "react";
import { useMemo } from "react";
import { Text, View } from "react-native";

import AnalyticsListContent from "./AnalyticsListContent";
import AnalyticsPieContent from "./AnalyticsPieContent";

type AnalyticsCategorySpendingsProps = {
  currentDate: Date;
  transactions: transaction[];
};

const AnalyticsCategorySpendings = ({
  currentDate,
  transactions,
}: AnalyticsCategorySpendingsProps) => {
  const [tabValue, setTabValue] = React.useState("list");

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};

    transactions.forEach((t) => {
      if (!totals[t.category]) totals[t.category] = 0;
      totals[t.category] += parseFloat(t.amount);
    });

    return Object.entries(totals)
      .map(([category, value]) => ({ category, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <Tabs value={tabValue} onValueChange={setTabValue} className="">
      <View style={{ marginVertical: 16 }}>
        <View className="flex flex-row justify-between items-center w-full">
          <Text
            className="text-base font-semibold flex-1"
            style={{ color: "#8796A9", lineHeight: 16 }}
          >
            <Text
              className="text-xl"
              style={{ fontWeight: "800", color: "#ffffff" }}
            >
              {format(currentDate, "MMMM")}
            </Text>
            {"\n"}Spending by Category
          </Text>
          <TabsList
            style={{
              height: "auto",
              backgroundColor: "#0F172A",
              padding: 6,
              borderRadius: 8,
              gap: 6,
            }}
          >
            <TabsTrigger
              value="list"
              className="flex justify-center items-center"
              style={{
                backgroundColor: tabValue === "list" ? "#11A4D4" : "#0F172A",
              }}
            >
              <MaterialIcons
                name="list"
                size={24}
                color={tabValue === "list" ? "#ffffff" : "#9ca3af"}
              />
            </TabsTrigger>
            <TabsTrigger
              value="pie"
              className="flex justify-center items-center"
              style={{
                backgroundColor: tabValue === "pie" ? "#11A4D4" : "#0F172A",
              }}
            >
              <MaterialIcons
                name="pie-chart-outline"
                size={24}
                color={tabValue === "pie" ? "#ffffff" : "#9ca3af"}
              />
            </TabsTrigger>
          </TabsList>
        </View>
        <TabsContent value="list">
          <AnalyticsListContent categoryTotals={categoryTotals} />
        </TabsContent>
        <TabsContent value="pie">
          <AnalyticsPieContent categoryTotals={categoryTotals} />
        </TabsContent>
      </View>
    </Tabs>
  );
};

export default AnalyticsCategorySpendings;
