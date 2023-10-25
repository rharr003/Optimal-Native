import { View, StyleSheet } from "react-native";
import FilterButton from "./FilterButton";

export default function FilterButtonGroup({ currFormat, onFilterChange }) {
  function toggleFilterDaily() {
    onFilterChange("Daily Average");
  }

  function toggleFilterWeekly() {
    onFilterChange("Weekly Average");
  }

  function toggleFilterMonthly() {
    onFilterChange("Monthly Average");
  }

  return (
    <View style={styles.container}>
      <FilterButton
        text={"7d"}
        onPress={toggleFilterDaily}
        isSelected={currFormat === "daily"}
      />
      <FilterButton
        text={"6w"}
        onPress={toggleFilterWeekly}
        isSelected={currFormat === "weekly"}
      />
      <FilterButton
        text={"6m"}
        onPress={toggleFilterMonthly}
        isSelected={currFormat === "monthly"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 5,
    left: -10,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});
