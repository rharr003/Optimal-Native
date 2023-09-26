import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../ColorPalette";
import { parseDate } from "../../../util/chart/tracking/formatWeightData";
import SwipeToDeleteView from "../../shared/gestures/SwipeToDeleteView";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function StatDetailEntry({
  stat,
  unit,
  idxRemoved,
  setIdxRemoved,
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
      idxRemoved={idxRemoved}
      setIdxRemoved={setIdxRemoved}
      activeIdx={activeIdx}
      removeSet={removeItem}
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.dateText}>{date}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.valueText}>
              {stat.value} {unit}
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.deleteView]}>
        <Ionicons
          name="trash-outline"
          size={30}
          color={"#FFFFFF"}
          style={{ marginLeft: 25 }}
        />
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
  },

  innerContainer: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  deleteView: {
    backgroundColor: ColorPalette.dark.error,
    width: "100%",
    justifyContent: "center",
  },

  dateText: {
    color: ColorPalette.dark.gray300,
    fontSize: 16,
    fontWeight: "bold",
  },

  valueText: {
    color: ColorPalette.dark.gray400,
    fontSize: 16,
  },

  popupAnchor: {
    backgroundColor: ColorPalette.dark.gray800,
  },
  optionText: {
    color: ColorPalette.dark.secondary200,
    fontSize: 16,
  },
});
