import { useSelector } from "react-redux";
import { View, Text, StyleSheet, Pressable } from "react-native";
import CustomButton from "../../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../../ColorPalette";

export default function IntakeMain({ handlePress }) {
  const currentIntake = useSelector((state) => state.userData.currentIntake);
  const calorieColor = useSelector((state) => state.userData.calorieColor);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.innerContainer,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.title}>Intake: </Text>
      <View style={styles.intakeView}>
        <Text style={[styles.text, { color: calorieColor }]}>
          {currentIntake ? `${currentIntake} kCal/D` : "Tap to Set"}
        </Text>
        <CustomButton
          title=""
          color={calorieColor}
          iconName="pencil-outline"
          onPress={handlePress}
          size={16}
          style={styles.customButtonStyle}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flexBasis: "49%",
    alignItems: "center",
    justifyContent: "center",
  },

  pressed: {
    opacity: 0.5,
  },

  intakeView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
    color: ColorPalette.dark.gray400,
  },

  text: {
    fontSize: 22,
    textAlign: "center",
    marginVertical: 3,
  },

  customButtonStyle: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 5,
    marginVertical: 3,
  },
});
