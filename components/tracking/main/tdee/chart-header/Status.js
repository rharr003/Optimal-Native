import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { ColorPalette } from "../../../../../ColorPalette";

export default function Status() {
  const currentPacing = useSelector((state) => state.userData.currentPacing);
  const calorieColor = useSelector((state) => state.userData.calorieColor);
  function getMessage() {
    if (currentPacing < 0) {
      return "Losing Weight";
    } else if (currentPacing > 0) {
      return "Gaining Weight";
    } else if (currentPacing === 0) {
      return "Maintaining Weight";
    }

    return "No Data";
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status:</Text>
      <View style={[styles.textContainer, { backgroundColor: calorieColor }]}>
        <Text style={styles.text}>{getMessage()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: "49%",
    justifyContent: "center",
    alignItems: "center",
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
