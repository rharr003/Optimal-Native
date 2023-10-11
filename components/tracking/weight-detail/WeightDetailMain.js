import { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomButton from "../../shared/ui/CustomButton";
import { ColorPalette } from "../../../ColorPalette";
import MeasurementListMain from "./measurement-list/MeasurementListMain";
import AddMeasurementMain from "./add-measurement/AddMeasurementMain";

export default function WeightDetailMain({ navigation, route }) {
  const { metric } = route.params;
  const [showModal, setShowModal] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: metric.name[0].toUpperCase() + metric.name.slice(1),
    });
  });

  function handleOpen() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  return (
    <View style={styles.container}>
      <AddMeasurementMain
        showModal={showModal}
        handleClose={handleClose}
        metric={metric}
      />
      <CustomButton
        title="Add Measurement"
        color={ColorPalette.dark.secondary200}
        iconName="add-outline"
        onPress={handleOpen}
        style={{ marginBottom: 15, width: "90%" }}
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
