import { View, StyleSheet } from "react-native";
import { fetchCurrentIntake } from "../../../../../util/sqlite/db";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentIntake } from "../../../../../util/redux/slices/userData";
import Pacing from "./pacing/Pacing";
import Status from "./status/Status";

export default function StatusPacing() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const intake = await fetchCurrentIntake();
      if (intake) {
        dispatch(setCurrentIntake(intake));
      }
    }
    fetch();
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
