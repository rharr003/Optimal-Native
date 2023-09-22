import { View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";
import { ColorPalette } from "../../ColorPalette";

export default function LineChartFilterButton({
  filterOptions,
  onFilterChange,
}) {
  return (
    <View style={styles.selectOverlay}>
      <SelectDropdown
        data={filterOptions}
        defaultButtonText={filterOptions[0]}
        buttonStyle={styles.selectButton}
        buttonTextStyle={styles.selectButtonText}
        dropdownStyle={styles.dropDown}
        onSelect={(selectedItem) => {
          onFilterChange(selectedItem);
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
