import { View, StyleSheet } from "react-native";
import WeightMain from "./weight/WeightMain";
import TdeeMain from "./tdee/TdeeMain";

export default function TrackingMain() {
  return (
    <View style={styles.container}>
      <WeightMain />
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
});
