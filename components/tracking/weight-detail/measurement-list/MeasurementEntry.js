import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../ColorPalette";
import { parseDate } from "../../../../util/chart/tracking/formatWeightData";
import SwipeToDeleteView from "../../../shared/gestures/SwipeToDeleteView";

export default function MeasurementEntry({
  stat,
  unit,
  activeIdx,
  index,
  removeItem,
}) {
  const date = new Date(parseDate(stat.date)).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <SwipeToDeleteView
      index={index}
      activeIdx={activeIdx}
      removeSet={removeItem}
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.valueText}>
            {stat.value} {unit}
          </Text>
        </View>
      </View>
    </SwipeToDeleteView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  innerContainer: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dateText: {
    color: ColorPalette.dark.gray400,
    fontSize: 16,
  },

  valueText: {
    color: ColorPalette.dark.gray300,
    fontSize: 16,
    fontWeight: "bold",
  },
});
