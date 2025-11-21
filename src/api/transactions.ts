import { supabase } from "@/lib/supabase";

export const addTransaction = async (transaction: any) => {
  const { data, error } = await supabase
    .from("transactions")
    .insert(transaction)
    .select("*");

  return { data, error };
};
