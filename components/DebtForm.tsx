import { debt } from "@/types/debts";
import { MaterialIcons } from "@expo/vector-icons";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

const categories = ["Money I Owe", "Money Owed To Me"];
const statusList = ["Pending", "Paid"];

type DebtFormProps = {
  initialData?: Partial<debt>;
  onSubmit: (data: Partial<debt>) => void;
};

const getLocalISODate = (d: Date) => {
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().split("T")[0];
};

const DebtForm = ({ initialData = {}, onSubmit }: DebtFormProps) => {
  const today = new Date();
  const todayISO = getLocalISODate(today);
  const [name, setName] = useState(initialData.name || "");
  const [amount, setAmount] = useState(initialData?.amount?.toString() || "");
  const [date, setDate] = useState(
    initialData.date ? getLocalISODate(new Date(initialData.date)) : todayISO
  );
  const [category, setCategory] = useState(initialData.category || "");
  const [status, setStatus] = useState(initialData.status || "");
  const [note, setNote] = useState(initialData.note || "");

  const formatDisplayDate = (isoDate: string) => {
    return format(new Date(isoDate), "dd/MM/yyyy");
  };

  const dateSheetRef = useRef<BottomSheetModal>(null);
  const dateSnapPoints = useMemo(() => ["60%"], []);

  const categorySheetRef = useRef<BottomSheetModal>(null);
  const categorySnapPoints = useMemo(() => ["25%", "50%"], []);

  const statusSheetRef = useRef<BottomSheetModal>(null);
  const statusSnapPoints = useMemo(() => ["25%", "50%"], []);

  const openDateSheet = useCallback(() => {
    categorySheetRef.current?.dismiss();
    statusSheetRef.current?.dismiss();
    dateSheetRef.current?.present();
  }, []);

  const openCategorySheet = useCallback(() => {
    dateSheetRef.current?.dismiss();
    statusSheetRef.current?.dismiss();
    categorySheetRef.current?.present();
  }, []);

  const openStatusSheet = useCallback(() => {
    dateSheetRef.current?.dismiss();
    categorySheetRef.current?.dismiss();
    statusSheetRef.current?.present();
  }, []);

  const handleDateSelect = useCallback((day: any) => {
    setDate(day.dateString);
    dateSheetRef.current?.dismiss();
  }, []);

  const handleCategorySelect = useCallback((item: string) => {
    setCategory(item);
    categorySheetRef.current?.dismiss();
  }, []);

  const handleStatusSelect = useCallback((item: string) => {
    setStatus(item);
    statusSheetRef.current?.dismiss();
  }, []);

  const renderCategoryItem = useCallback(
    ({ item }: { item: string }) => (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => handleCategorySelect(item)}
      >
        <Text style={styles.categoryText}>{item}</Text>
      </TouchableOpacity>
    ),
    [handleCategorySelect]
  );

  const renderStatusItem = useCallback(
    ({ item }: { item: string }) => (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => handleStatusSelect(item)}
      >
        <Text style={styles.categoryText}>{item}</Text>
      </TouchableOpacity>
    ),
    [handleStatusSelect]
  );

  return (
    <>
      <View style={[styles.container]}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Person name"
          placeholderTextColor="#8796A9"
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          keyboardType="numeric"
          placeholderTextColor="#8796A9"
        />

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={[
            styles.input,
            {
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
          onPress={openDateSheet}
          activeOpacity={0.7}
        >
          <Text style={{ color: date ? "#fff" : "#8796A9", flex: 1 }}>
            {date ? formatDisplayDate(date) : "Select a date"}
          </Text>
          <MaterialIcons name="calendar-today" size={18} color="white" />
        </TouchableOpacity>

        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          style={[styles.input, { flexDirection: "row", alignItems: "center" }]}
          onPress={openCategorySheet}
        >
          <Text style={{ color: category ? "#fff" : "#8796A9", flex: 1 }}>
            {category.length > 0 ? category : "Select a category"}
          </Text>
          <MaterialIcons name="arrow-drop-down" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.label}>Status</Text>
        <TouchableOpacity
          style={[styles.input, { flexDirection: "row", alignItems: "center" }]}
          onPress={openStatusSheet}
        >
          <Text style={{ color: status ? "#fff" : "#8796A9", flex: 1 }}>
            {status.length > 0 ? status : "Select a status"}
          </Text>
          <MaterialIcons name="arrow-drop-down" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[
            styles.input,
            {
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              textAlignVertical: "top",
              textAlign: "left",
            },
          ]}
          value={note}
          onChangeText={setNote}
          placeholder="Optional notes"
          placeholderTextColor="#8796A9"
          multiline
        />

        <TouchableOpacity
          style={[styles.button]}
          onPress={() =>
            onSubmit({
              name: name.trim(),
              amount,
              date: new Date(date),
              category,
              status,
              note,
            })
          }
          className="rounded-lg"
        >
          <Text style={styles.buttonText}>
            {initialData?.id ? "Save" : "Create"}
          </Text>
        </TouchableOpacity>
      </View>

      <BottomSheetModal
        ref={dateSheetRef}
        index={1}
        snapPoints={dateSnapPoints}
      >
        <BottomSheetView style={{ padding: 16 }}>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
              [todayISO]: { marked: true, dotColor: "red" },
              [date]: { selected: true, selectedColor: "#000" },
            }}
            theme={{
              todayTextColor: "red",
              arrowColor: "#000",
              textMonthFontWeight: "bold",
            }}
          />
        </BottomSheetView>
      </BottomSheetModal>

      <BottomSheetModal
        ref={categorySheetRef}
        index={1}
        snapPoints={categorySnapPoints}
        style={styles.bottomSheet}
      >
        <BottomSheetFlatList
          data={categories}
          keyExtractor={(i: string) => i}
          renderItem={renderCategoryItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheetModal>

      <BottomSheetModal
        ref={statusSheetRef}
        index={1}
        snapPoints={statusSnapPoints}
        style={styles.bottomSheet}
      >
        <BottomSheetFlatList
          data={statusList}
          keyExtractor={(i: string) => i}
          renderItem={renderStatusItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#394353",
    borderRadius: 6,
    padding: 12,
    color: "#fff",
    backgroundColor: "#1E2C33",
  },
  button: {
    marginTop: 25,
    backgroundColor: "#11A4D4",
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  categoryItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  categoryText: { fontSize: 16 },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    backgroundColor: "white",
  },
});

export default DebtForm;
