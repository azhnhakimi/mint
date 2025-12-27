import { supabase } from "@/lib/supabase";

export const addDebt = async (debt: any) => {
  const { data, error } = await supabase.from("debts").insert(debt).select("*");

  return { data, error };
};

export const updateDebt = async (id: any, debt: any) => {
  const { error } = await supabase
    .from("debts")
    .update({
      name: debt.name,
      amount: debt.amount,
      category: debt.category,
      note: debt.note,
      date: debt.date.toISOString().split("T")[0],
      status: debt.status,
    })
    .eq("id", id);

  return { error };
};

export const getSingleDebt = async (id: string) => {
  const { data, error } = await supabase
    .from("debts")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
};

export const getDebtsIOwe = async (userId: string) => {
  const { data, error } = await supabase
    .from("debts")
    .select("*")
    .eq("userId", userId)
    .eq("category", "Money I Owe")
    .order("date", { ascending: false });

  return { data, error };
};

export const getDebtsOwedToMe = async (userId: string) => {
  const { data, error } = await supabase
    .from("debts")
    .select("*")
    .eq("userId", userId)
    .eq("category", "Money Owed To Me")
    .order("date", { ascending: false });

  return { data, error };
};

export const deleteDebt = async (id: string) => {
  const { error } = await supabase.from("debts").delete().eq("id", id);

  return { error };
};
