import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

export const addTransaction = async (transaction: any) => {
  const { data, error } = await supabase
    .from("transactions")
    .insert(transaction)
    .select("*");

  return { data, error };
};

export const updateTransaction = async (id: any, transaction: any) => {
  const { error } = await supabase
    .from("transactions")
    .update({
      name: transaction.name,
      amount: transaction.amount,
      category: transaction.category,
      details: transaction.details,
      date: transaction.date.toISOString().split("T")[0],
    })
    .eq("id", id);

  return { error };
};

export const getSingleTransaction = async (id: string) => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
};

export const getTransactionsByMonth = async (
  userId: string,
  year: number,
  month: number
) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("userId", userId)
    .gte("date", startDate.toISOString().split("T")[0])
    .lt("date", endDate.toISOString().split("T")[0])
    .order("date", { ascending: false });

  return { data, error };
};

export async function getTransactionsForWeek(
  userId: string,
  start: Date,
  end: Date
) {
  const startDate = format(start, "yyyy-MM-dd");
  const endDate = format(end, "yyyy-MM-dd");

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("userId", userId)
    .gte("date", startDate)
    .lte("date", endDate);

  return { data, error };
}

export const deleteTransaction = async (id: string) => {
  const { error } = await supabase.from("transactions").delete().eq("id", id);

  return { error };
};
