import { View, StyleSheet } from "react-native";
import {
  fetchLastMetricValue,
  fetchUserData,
} from "../../../../util/sqlite/db";
import { useEffect } from "react";
import Weight from "./Weight";
import Bmi from "./Bmi";
import { ColorPalette } from "../../../../ColorPalette";
import { useSelector, useDispatch } from "react-redux";
import { updateWeight } from "../../../../util/redux/slices/userData";
import WeightStatus from "./WeightStatus";
import CustomButton from "../../../shared/ui/CustomButton";

export default function CurrentWeightMain({ handleOpenModal }) {
  const currWeight = useSelector(
    (state) => state.userData.currentWeight.weight
  );
  const bmi = useSelector((state) => state.userData.currentBmi);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const userData = await fetchUserData();
      const result = await fetchLastMetricValue(1);
      if (!result) return;
      dispatch(
        updateWeight({
          weight: result.value,
          date: result.date,
          height: userData?.height,
        })
      );
    }
    if (!currWeight || !bmi) {
      try {
        fetch();
      } catch (e) {
        console.log(e);
      }
    }
  }, [currWeight, bmi]);
  return (
    <View style={styles.container}>
      <WeightStatus bmi={bmi} />
      <View style={styles.innerContainer}>
        <Weight currWeight={currWeight} />
        <Bmi bmi={bmi} />
      </View>
      <CustomButton
        title="Add Measurement"
        color={ColorPalette.dark.secondary200}
        iconName="add-outline"
        onPress={handleOpenModal}
        style={styles.buttonStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 325,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorPalette.dark.gray900,
    borderColor: ColorPalette.dark.secondary200,
    borderWidth: 1,
    borderRadius: 25,
  },
  innerContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonStyle: {
    marginBottom: 25,
    width: "85%",
  },
});
