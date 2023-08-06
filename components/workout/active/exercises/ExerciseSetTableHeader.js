import { View, Text, Pressable, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ColorPalette } from "../../../ui/ColorPalette";

export default function ExerciseSetTableHeader({ handleModalToggle }) {
  return (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCellExtraSmall, styles.tableHeaderText]}>
        Set
      </Text>
      <Text style={[styles.tableCellWide, styles.tableHeaderText]}>
        Previous
      </Text>
      <Text style={[styles.tableCellRegular, styles.tableHeaderText]}>
        Weight
      </Text>
      <Text style={[styles.tableCellSmall, styles.tableHeaderText]}>Reps</Text>
      <Pressable
        style={[styles.tableCellExtraSmall]}
        onPress={handleModalToggle}
      >
        <Ionicons
          name="ellipsis-vertical-outline"
          size={28}
          color={ColorPalette.dark.secondary200}
          style={{
            margin: 0,
            padding: 0,
            textAlign: "center",
          }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  tableCellExtraSmall: {
    flex: 1,
    margin: 0,
    textAlign: "center",
    margin: 5,
  },

  tableCellSmall: {
    flex: 2,
    margin: 0,
    textAlign: "center",
  },

  tableCellRegular: {
    flex: 3,
    margin: 5,
    textAlign: "center",
  },

  tableHeaderText: {
    fontWeight: "bold",
    color: ColorPalette.dark.secondary200,
    fontSize: 16,
  },

  tableCellWide: {
    flex: 4,
    margin: 5,
    textAlign: "center",
  },
});
