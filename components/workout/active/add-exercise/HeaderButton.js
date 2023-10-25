import { View, StyleSheet } from "react-native";
import CustomButton from "../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../ColorPalette";

export default function HeaderButton({ isReplacing, onPress, count }) {
  return (
    <View style={styles.container}>
      <CustomButton
        title={isReplacing ? "Replace" : `Add(${count})`}
        onPress={onPress}
        style={styles.button}
        textColor={ColorPalette.dark.secondary200}
        iconName={isReplacing ? "swap-horizontal-outline" : "add-outline"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    padding: 0,
  },
});
