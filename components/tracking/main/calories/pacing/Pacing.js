import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../../ColorPalette";

export default function Pacing() {
  const currentPacing = useSelector((state) => state.userData.currentPacing);
  const calorieColor = useSelector((state) => state.userData.calorieColor);
  return (
    <View style={styles.innerContainer}>
      <Text style={styles.title}>Pacing: </Text>
      <Text style={[styles.text, { color: calorieColor }]}>
        {currentPacing ? `${currentPacing} lbs/week` : "No Data"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flexBasis: "49%",
    alignItems: "center",
    justifyContent: "center",
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
});
