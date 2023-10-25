import { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomButton from "../../shared/ui/CustomButton";
import { ColorPalette } from "../../../ColorPalette";
import MeasurementListMain from "./measurement-list/MeasurementListMain";
import AddMeasurementMain from "./add-measurement-modal/AddMeasurementMain";
import CurrentWeightMain from "./current-weight-display/CurrentWeightMain";

export default function WeightDetailMain({ route }) {
  const { metric } = route.params;
  const [showModal, setShowModal] = useState(false);

  function handleOpen() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  return (
    <View style={styles.container}>
      <CurrentWeightMain handleOpenModal={handleOpen} />
      <AddMeasurementMain
        showModal={showModal}
        handleClose={handleClose}
        metric={metric}
      />
      <MeasurementListMain route={route} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
