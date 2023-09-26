import CustomButton from "../shared/ui/CustomButton";
import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../ColorPalette";

export default function ExerciseEditButton({ onPress }) {
  return (
    <View style={styles.centeredView}>
      <CustomButton
        onPress={onPress}
        title="Edit"
        textColor={ColorPalette.dark.secondary200}
        color="transparent"
        style={styles.buttonStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    margin: 0,
    paddingVertical: 3,
  },
});
