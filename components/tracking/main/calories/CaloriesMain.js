import { View, StyleSheet } from "react-native";
import { fetchCurrentIntake } from "../../../../util/sqlite/db";
import { useEffect, useState } from "react";
import CalorieEntryModal from "./intake/IntakeEntryModal";
import { useDispatch } from "react-redux";
import { setCurrentIntake } from "../../../../util/redux/userData";
import Pacing from "./pacing/Pacing";
import IntakeMain from "./intake/IntakeMain";

export default function CaloriesMain() {
  const [showModal, setShowModal] = useState(false);
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

  function handlePress() {
    setShowModal(true);
  }
  return (
    <>
      <CalorieEntryModal showModal={showModal} setShowModal={setShowModal} />
      <View style={styles.row}>
        <IntakeMain handlePress={handlePress} />
        <Pacing />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
  },
});
