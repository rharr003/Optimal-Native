import CenteredModal from "../../../shared/modals/CenteredModal";
import { View, TextInput, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../ColorPalette";
import { useState } from "react";
import { insertUserMetric } from "../../../../util/sqlite/db";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch } from "react-redux";
import calculateTdee from "../../../../util/calculateTdee";
import {
  setTdee,
  setOverlayMessage,
} from "../../../../util/redux/slices/userData";
import AddMeasurementButtonGroup from "./AddMeasurementButtonGroup";
import { addWeightMeasurement } from "../../../../util/redux/slices/userData";
export default function AddMeasurementMain({ showModal, handleClose, metric }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  async function handleSave() {
    const formattedDate = date.toISOString().split("T")[0];
    const newEntry = await insertUserMetric(metric.id, text, formattedDate);
    dispatch(addWeightMeasurement(newEntry));
    // recalculate tdee based on new weight
    const result = await calculateTdee();
    if (typeof result === "number") {
      dispatch(setTdee(result));
      dispatch(setOverlayMessage(""));
    } else {
      dispatch(setTdee(0));
      dispatch(setOverlayMessage(result));
    }
    setText("");
    handleClose();
  }

  function handleChangeText(text) {
    setText(text);
  }

  function handleCancel() {
    setText("");
    setDate(new Date());
    handleClose();
  }
  function handleChangeDate(e, date) {
    setDate(date);
  }
  return (
    <CenteredModal showModal={showModal} handleClose={handleCancel}>
      <View style={styles.container}>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          display="spinner"
          themeVariant="dark"
          maximumDate={new Date()}
          onChange={handleChangeDate}
        />
        <TextInput
          style={styles.input}
          value={text}
          placeholder={`Enter ${metric.name} (${metric.unit})`}
          placeholderTextColor={ColorPalette.dark.gray500}
          onChangeText={handleChangeText}
          maxLength={24}
          returnKeyType="done"
          keyboardType="numeric"
        />
        <AddMeasurementButtonGroup
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      </View>
    </CenteredModal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    width: "100%",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: ColorPalette.dark.gray700,
  },
  input: {
    width: "95%",
    backgroundColor: ColorPalette.dark.gray800,
    borderRadius: 15,
    padding: 5,
    fontSize: 24,
    color: ColorPalette.dark.secondary200,
    textAlign: "center",
  },
});
