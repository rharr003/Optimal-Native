import { useSelector } from "react-redux";
import { Text, StyleSheet, Pressable } from "react-native";
import CustomButton from "../../../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../../../ColorPalette";

export default function IntakeMain({ handlePress }) {
  const currentIntake = useSelector((state) => state.userData.currentIntake);
  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Text style={styles.text}>
        {currentIntake ? `${currentIntake} kCal/D` : "Tap to Set"}
      </Text>
      <CustomButton
        title=""
        color={ColorPalette.dark.secondary200}
        iconName="pencil-outline"
        onPress={handlePress}
        size={20}
        style={styles.buttonStyle}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  pressed: {
    opacity: 0.5,
  },

  text: {
    color: ColorPalette.dark.secondary200,
    fontSize: 20,
  },

  buttonStyle: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
