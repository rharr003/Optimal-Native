import CenteredModal from "../../../shared/modals/CenteredModal";
import { View, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../ColorPalette";
import { useState } from "react";
import { insertUserMetric, fetchUserData } from "../../../../util/sqlite/db";
import { useDispatch, useSelector } from "react-redux";
import calculateTdee from "../../../../util/calculateTdee";
import {
  setTdee,
  setOverlayMessage,
  updatePacing,
  addWeightMeasurement,
  updateWeight,
} from "../../../../util/redux/slices/userData";
import AddMeasurementButtonGroup from "./AddMeasurementButtonGroup";
import WeightDateSelector from "./WeightDateSelector";
import FormInput from "../../../shared/ui/FormInput";

export default function AddMeasurementMain({ showModal, handleClose, metric }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date());
  const currWeightDate = useSelector(
    (state) => state.userData.currentWeight.date
  );
  const dispatch = useDispatch();

  async function handleSave() {
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const newId = await insertUserMetric(metric.id, text, formattedDate);
      dispatch(
        addWeightMeasurement({ date: formattedDate, value: text, id: newId })
      );
      // if the submitted data would be the most recent data point we update redux
      if (date.getTime() > new Date(currWeightDate).getTime()) {
        const userData = await fetchUserData();
        dispatch(
          updateWeight({
            weight: parseFloat(text),
            date: formattedDate,
            height: userData?.height,
          })
        );
        // recalculate tdee based on new weight
        const result = await calculateTdee();
        if (typeof result === "number") {
          dispatch(setTdee(result));
          dispatch(setOverlayMessage(""));
        } else {
          dispatch(setTdee(0));
          dispatch(setOverlayMessage(result));
        }
        // lazy implementation blindly adding to build without any testing.
        setTimeout(() => {
          dispatch(updatePacing());
        }, 100);
      }
    } catch (e) {
      console.log(e);
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
  function handleChangeDate(date) {
    setDate(date);
  }
  return (
    <CenteredModal
      showModal={showModal}
      handleClose={handleCancel}
      style={{ height: 250 }}
    >
      <View style={styles.container}>
        <FormInput
          placeholder={"Example:  185"}
          iconName={"body-outline"}
          handleChange={handleChangeText}
          text={text}
          label={"Weight: (lb)"}
        />
        <WeightDateSelector handleChange={handleChangeDate} date={date} />
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
    borderRadius: 25,
    justifyContent: "space-between",
    alignItems: "center",
  },

  formGroup: {
    width: "90%",
  },

  label: {
    fontSize: 18,
    color: ColorPalette.dark.secondary200,
    marginBottom: 5,
  },

  fakeInput: {
    width: "100%",
    backgroundColor: ColorPalette.dark.gray900,
    borderRadius: 5,
    padding: 5,
    paddingLeft: 25,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "100%",
    marginLeft: 5,
    fontSize: 18,
    color: ColorPalette.dark.secondary200,
  },
});
