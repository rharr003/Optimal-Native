import { View, StyleSheet } from "react-native";
import { fetchCurrentIntake } from "../../../../../util/sqlite/db";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentIntake,
  updatePacing,
} from "../../../../../util/redux/slices/userData";
import Pacing from "./Pacing";
import Status from "./Status";

export default function ChartHeader() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const intake = await fetchCurrentIntake();
      if (intake) {
        dispatch(setCurrentIntake(intake));
        dispatch(updatePacing());
      }
    }
    try {
      fetch();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <View style={styles.row}>
      <Status />
      <Pacing />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    marginTop: 10,
  },
});
