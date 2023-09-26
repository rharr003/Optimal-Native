import CustomButton from "../shared/ui/CustomButton";
import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../ColorPalette";

export default function ExerciseDeleteButton({ onPress }) {
  return (
    <View style={styles.centeredView}>
      <CustomButton
        onPress={onPress}
        title="Delete"
        textColor={ColorPalette.dark.error}
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
