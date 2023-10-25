import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../../ColorPalette";
import IntakeMain from "./intake/IntakeMain";
import IntakeEntryModal from "./intake/IntakeEntryModal";
import { useState } from "react";

export default function TdeeHeader() {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(true);
  }
  return (
    <View style={styles.container}>
      <IntakeEntryModal showModal={showModal} setShowModal={setShowModal} />
      <Text style={styles.title}>Intake Report:</Text>
      <IntakeMain handlePress={toggleModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: ColorPalette.dark.secondary200,
  },

  statusLabelView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },

  text: {
    fontSize: 18,
    textAlign: "center",
  },
});
