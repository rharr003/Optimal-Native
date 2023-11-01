import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../../../ColorPalette";

export default function Pacing() {
  const currentPacing = useSelector((state) => state.userData.currentPacing);
  const calorieColor = useSelector((state) => state.userData.calorieColor);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pacing: </Text>
      <View style={[styles.textContainer, { backgroundColor: calorieColor }]}>
        <Text style={styles.text}>
          {currentPacing !== ""
            ? `${currentPacing > 0 ? "+" : ""} ${
                currentPacing === 0 ? "0.0" : currentPacing
              } lbs/week`
            : "No Data"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: "49%",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: ColorPalette.dark.secondary200,
  },

  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  text: {
    fontSize: 14,
    textAlign: "center",
  },
});
