import { View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";
import {
  fetchRecentWeightDataDailyAvg,
  fetchRecentWeightDataWeeklyAvg,
  fetchRecentWeightDataMonthlyAvg,
} from "../../../../util/sqlite/db";
import { ColorPalette } from "../../../../ColorPalette";

export default function ChartFilter({
  setIndexesToHide,
  setMetricData,
  setCurrFormat,
}) {
  async function handleChartFilterUpdate(filter) {
    if (filter === "7 Day") {
      const [measurements, indexesToHide] =
        await fetchRecentWeightDataDailyAvg();
      setIndexesToHide(indexesToHide);
      setMetricData(measurements);
      setCurrFormat("daily");
    } else if (filter === "6 Week Average") {
      const [measurements, indexesToHide] =
        await fetchRecentWeightDataWeeklyAvg();
      setIndexesToHide(indexesToHide);
      setMetricData(measurements);
      setCurrFormat("weekly");
    } else if (filter === "6 Month Average") {
      const [measurements, indexesToHide] =
        await fetchRecentWeightDataMonthlyAvg();
      setIndexesToHide(indexesToHide);
      setMetricData(measurements);
      setCurrFormat("monthly");
    }
  }

  return (
    <View style={styles.selectOverlay}>
      <SelectDropdown
        data={["7 Day", "6 Week Average", "6 Month Average"]}
        defaultButtonText="6 Week Average"
        buttonStyle={styles.selectButton}
        buttonTextStyle={styles.selectButtonText}
        dropdownStyle={styles.dropDown}
        onSelect={(selectedItem, index) => {
          handleChartFilterUpdate(selectedItem);
        }}
        rowTextStyle={styles.rowTextStyle}
        rowStyle={styles.row}
        showsVerticalScrollIndicator={false}
        dropdownIconPosition="right"
        dropdownOverlayColor="transparent"
        renderDropdownIcon={() => (
          <Ionicons
            name="chevron-down-outline"
            style={{ margin: 0 }}
            size={16}
            color={ColorPalette.dark.secondary200}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  selectOverlay: {
    position: "absolute",
    top: 5,
    left: 0,
    width: "100%",
    alignItems: "center",
  },

  selectButton: {
    borderRadius: 10,
    width: 260,
    height: 30,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: ColorPalette.dark.secondary200,
  },

  selectButtonText: {
    color: ColorPalette.dark.secondary200,
    fontSize: 16,
  },

  dropDown: {
    backgroundColor: "#12121270",
    borderRadius: 10,
    borderBottomColor: ColorPalette.dark.secondary200,
    borderBottomWidth: 1,
    borderLeftColor: ColorPalette.dark.secondary200,
    borderLeftWidth: 1,
    borderRightColor: ColorPalette.dark.secondary200,
    borderRightWidth: 1,
  },

  row: {
    borderBottomColor: ColorPalette.dark.secondary200,
    height: 40,
    borderBottomWidth: 1,
  },

  rowTextStyle: {
    color: ColorPalette.dark.secondary200,
    fontSize: 16,
  },
});
