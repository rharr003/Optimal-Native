import { View, StyleSheet } from "react-native";
import CaloriesMain from "./calories/CaloriesMain";
import WeightMain from "./weight/WeightMain";
import TdeeMain from "./tdee/TdeeMain";

export default function TrackingMain() {
  return (
    <View style={styles.container}>
      <View style={styles.rightView}>
        <WeightMain />
      </View>
      <CaloriesMain />
      <TdeeMain />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },

  rightView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
